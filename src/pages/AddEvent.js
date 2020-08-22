import React from 'react';

import EventForm from '../components/EventForm';
import { useHistory } from 'react-router-dom';

// Context
import { useGlobalStateContext } from '../context/globalContext';

const AddEvent = () => {
	let history = useHistory();

	const { selectedCategory } = useGlobalStateContext();

	const sendData = (eventNewId) => {
		history.push(`/singleEventPage/${eventNewId}`);
	};

	return (
		<div>
			<EventForm
				categoryName={selectedCategory.name}
				categoryId={selectedCategory._id}
				callback={sendData}
			/>
		</div>
	);
};

export default AddEvent;
