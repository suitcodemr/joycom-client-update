import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RestoreIcon from '@material-ui/icons/Restore';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { AuthContext } from '../context/auth';

const NavBar = () => {
	const [value, setValue] = useState('recents');
	const { user, logout } = useContext(AuthContext);

	const [dimensions, setDimensions] = useState({
		height: window.innerHeight,
		width: window.innerWidth,
	});

	useEffect(() => {
		window.addEventListener('resize', handleResize);

		function handleResize() {
			setDimensions({
				height: window.innerHeight,
				width: window.innerWidth,
			});
			return (_) => {
				window.removeEventListener('resize', handleResize);
			};
		}
	}, [dimensions]);

	const menuBar = user ? (
		<Navbar collapseOnSelect bg='primary' variant='dark' expand='lg'>
			<Container>
				<Link to='/'>
					<Navbar.Brand>
						<span className='icon-logo'></span>Joycom
					</Navbar.Brand>
				</Link>
				{dimensions.width > 991 ? (
					<Nav>
						<Link
							to={`/myAccount/${user._id}`}
							className='myAccount nav-link'
						>
							Mein Profil<i className='icon-gear'></i>
						</Link>
						<Link to='/' className='myAccount nav-link' onClick={logout}>
							Ausloggen<i className='icon-log-out'></i>
						</Link>
					</Nav>
				) : (
					<Dropdown className='user-dropdown' drop='left'>
						<Dropdown.Toggle variant='primary' id='dropdown-basic'>
							<i className='icon-user'></i>
						</Dropdown.Toggle>
						<Dropdown.Menu className='border-inverted'>
							<Link
								to={`/myAccount/${user._id}`}
								className='nav-link myAccount dropdown-item'
							>
								Mein Profil<i className='icon-gear'></i>
							</Link>

							<Dropdown.Divider />

							<Link
								className='nav-link logout dropdown-item'
								to='/'
								onClick={logout}
							>
								Ausloggen
								<i className='icon-log-out'></i>
							</Link>
						</Dropdown.Menu>
					</Dropdown>
				)}

				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ml-auto'>
						<Link to='/aboutUs' className='aboutUs nav-link'>
							Über uns
						</Link>

						<Link to='/idea' className='idea nav-link'>
							Idee
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	) : (
		<Navbar collapseOnSelect bg='primary' variant='dark' expand='lg'>
			<Container>
				<Link to='/'>
					<Navbar.Brand>
						<span className='icon-logo'></span>Joycom
					</Navbar.Brand>
				</Link>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav>
						<Link to='/login' className='nav-link'>
							Einloggen<i className='icon-key'></i>
						</Link>
						<Link to='/register' className='nav-link'>
							Registrieren
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
		// <BottomNavigation
		// 	value={value}
		// 	onChange={(event, newValue) => {
		// 		setValue(newValue);
		// 	}}
		// 	showLabels
		// >
		// 	<BottomNavigationAction label='Recent' icon={<RestoreIcon />} />
		// 	<BottomNavigationAction label='Favorites' icon={<FavoriteIcon />} />
		// 	<BottomNavigationAction label='Nearby' icon={<LocationOnIcon />} />
		// </BottomNavigation>
	);

	return <>{menuBar}</>;
};

export default NavBar;
