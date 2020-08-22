import React from 'react';

import { Spinner } from 'react-bootstrap';
import EventItem from '../components/EventItem';

import { useQuery } from '@apollo/react-hooks';

import { FETCH_CATEGORY_EVENTS_QUERY } from '../util/graphql';

const EventList = ({ categoryId }) => {
	const { loading, data } = useQuery(FETCH_CATEGORY_EVENTS_QUERY, {
		variables: { categoryId },
	});
	return (
		<>
			{loading ? (
				<>
					<Spinner animation='border' role='status'>
						<span className='sr-only'>Loading...</span>
					</Spinner>
				</>
			) : (
				data.getEventsCategory.map((event, index) => (
					<EventItem key={index} event={event} categoryId={categoryId} />
				))
			)}
		</>
	);
};

export default EventList;
