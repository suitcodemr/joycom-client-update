import React, { useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
	Container,
	Row,
	Col,
	Button,
	Jumbotron,
	Spinner
} from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';

import { AuthContext } from '../context/auth';
import { FETCH_CATEGORIES_QUERY } from '../util/graphql';

import CategoryCard from '../components/CategoryCard';

const Home = () => {
	const { user } = useContext(AuthContext);
	const { loading, data } = useQuery(FETCH_CATEGORIES_QUERY);

	return (
		<>
			<div className='home pageWrapper'>
				{!user && (
					<>
						<Jumbotron className='jumbotron-home'>
							<div className='h-100 d-flex align-items-center'>
								<Container>
									<Row>
										<Col>
											<h2 className='page-header'>Joycom</h2>
											<p className='page-header-subtitle'>
												Die neue Art miteinander zu kommunizieren und sich zu
												verabreden.
											</p>
											<LinkContainer to='login'>
												<Button variant='primary'>Einloggen</Button>
											</LinkContainer>
											<p className='d-inline-block ml-2 mr-2 text-uppercase'>
												oder
											</p>
											<LinkContainer to='/register'>
												<Button variant='info'>Jetzt registrieren!</Button>
											</LinkContainer>
										</Col>
									</Row>
								</Container>
							</div>
						</Jumbotron>
					</>
				)}

				<Container>
					<div className='categories content-warpper'>
						<h2 className='page-header mt-5'>Kategorien</h2>
						{loading ? (
							<>
								<Spinner animation='border' role='status'>
									<span className='sr-only'>Loading...</span>
								</Spinner>
							</>
						) : (
							<Row>
								{data &&
									data.getCategories.map(category => (
										<Col key={category._id} xs={6} md={4} lg={3}>
											<CategoryCard category={category} />
										</Col>
									))}
							</Row>
						)}
					</div>
				</Container>
			</div>
		</>
	);
};

export default Home;
