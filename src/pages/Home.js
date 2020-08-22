import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { Divider, Typography } from '@material-ui/core';

// Context
import { useGlobalStateContext } from '../context/globalContext';

import { useQuery } from '@apollo/react-hooks';
import { FETCH_CATEGORIES_QUERY } from '../util/graphql';

import DateSlider from '../components/DateSlider/DateSlider';
import CategorySlider from '../components/CategorySlider/CategorySlider';
import EventList from '../components/EventList';

const Home = () => {
	const { selectedCategory } = useGlobalStateContext();

	const { loading, data: dataFCQ } = useQuery(FETCH_CATEGORIES_QUERY);

	return (
		<>
			<div className='home pageWrapper'>
				<>
					<Container>
						<Typography className='mt-3' variant='body1'>
							Was steht in deiner Umgebung an...
						</Typography>
					</Container>
					<DateSlider />
					<Divider />
					<Container>
						<Typography className='mt-3 mb-1' variant='body1'>
							Kategorien
						</Typography>
					</Container>
					<div className='categories content-wrapper'>
						{loading ? (
							<>
								<Spinner animation='border' role='status'>
									<span className='sr-only'>Loading...</span>
								</Spinner>
							</>
						) : (
							<CategorySlider data={dataFCQ} />
						)}
					</div>
					<Divider />
					<Container>
						<Typography className='mt-3 mb-1' variant='body1'>
							Events
						</Typography>
						{loading ? (
							<>
								<Spinner animation='border' role='status'>
									<span className='sr-only'>Loading...</span>
								</Spinner>
							</>
						) : (
							selectedCategory._id !== undefined && (
								<EventList categoryId={selectedCategory._id} />
							)
						)}
					</Container>
				</>
			</div>
		</>
	);
};

export default Home;
