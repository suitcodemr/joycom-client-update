import React from 'react';

import { Card, CardContent, Typography } from '@material-ui/core';

// Context
import { useGlobalDispatchContext } from '../../context/globalContext';

const CardDateSlider = ({ date, currentDayIndex }) => {
	const dispatch = useGlobalDispatchContext();

	const { day, weekday } = date;
	// const {
	// 	year: year2,
	// 	month: month2,
	// 	day: day2,
	// 	weekday: weekday2,
	// } = currentDayIndex;

	const setCurrentDate = () => {
		dispatch({ type: 'SET_DATE', date: date });
	};

	return (
		<Card
			variant='outlined'
			square={false}
			className={`${
				date.year === currentDayIndex.year &&
				date.month === currentDayIndex.month &&
				date.day === currentDayIndex.day
					? 'mr_selected'
					: ''
			}`}
			onClick={setCurrentDate}
		>
			<CardContent>
				<Typography>{day}</Typography>
				<Typography>{`${weekday.substring(0, 2)}.`}</Typography>
			</CardContent>
		</Card>
	);
};

export default CardDateSlider;
