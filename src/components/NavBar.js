import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';

import {
	StyledBottomNavigation,
	StyledBottomNavigationAction,
} from '../styles/navigationStyles';

import { AuthContext } from '../context/auth';

const NavBar = () => {
	const [navEle, setNavEle] = useState(2);
	const { user } = useContext(AuthContext);

	const menuBar = user ? (
		<StyledBottomNavigation
			value={navEle}
			onChange={(event, newValue) => {
				setNavEle(newValue);
			}}
		>
			<StyledBottomNavigationAction
				component={Link}
				to={`/myAccount/${user._id}`}
				icon={<PersonIcon />}
			/>
			<StyledBottomNavigationAction icon={<SearchIcon />} />
			<StyledBottomNavigationAction
				component={Link}
				to='/'
				icon={<HomeIcon />}
			/>
			<StyledBottomNavigationAction
				component={Link}
				to='/addEvent'
				icon={<AddIcon />}
			/>
			<StyledBottomNavigationAction icon={<FavoriteIcon />} />
		</StyledBottomNavigation>
	) : (
		<StyledBottomNavigation
			value={navEle}
			onChange={(event, newValue) => {
				setNavEle(newValue);
			}}
		>
			<StyledBottomNavigationAction
				icon={<PersonIcon />}
				component={Link}
				to='/login'
			/>
			<StyledBottomNavigationAction icon={<SearchIcon />} />
			<StyledBottomNavigationAction
				component={Link}
				to='/'
				icon={<HomeIcon />}
			/>
			<StyledBottomNavigationAction
				component={Link}
				to='/login'
				icon={<AddIcon />}
			/>
			<StyledBottomNavigationAction icon={<FavoriteIcon />} />
		</StyledBottomNavigation>
	);

	return <>{menuBar}</>;
};

export default NavBar;
