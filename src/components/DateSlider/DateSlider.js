import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';

// components
import CardDateSlider from './CardDateSlider';

// Context
import {
	// useGlobalStateContext,
	useGlobalDispatchContext,
} from '../../context/globalContext';

var getDateArray = function () {
	var arrDates = [];
	// var dt = new Date();
	// dt.setDate(dt.getDate() - 181);
	// var end = new Date();
	// end.setDate(end.getDate() + 183);
	var dt = new Date();
	dt.setDate(dt.getDate() - 6);
	var end = new Date();
	end.setDate(end.getDate() + 6);
	var days = [
		'Sonntag',
		'Montag',
		'Dienstag',
		'Mittwoch',
		'Donnerstag',
		'Freitag',
		'Samstag',
	];
	let currentDayIndex = {};
	let dayIndexCounter = 0;
	while (dt <= end) {
		var tempDate = {
			year: new Date(dt).toISOString().substring(0, 4),
			month: new Date(dt).toISOString().substring(5, 7),
			day: new Date(dt).toISOString().substring(8, 10),
			weekday: days[new Date(dt).getDay()],
			dayIndex: dayIndexCounter,
		};

		if (
			tempDate.year === new Date().getFullYear().toString() &&
			tempDate.month === new Date().toISOString().substring(5, 7) &&
			tempDate.day === new Date().toISOString().substring(8, 10)
		) {
			currentDayIndex = tempDate;
		}
		arrDates.push(tempDate);
		dt.setDate(dt.getDate() + 1);
		dayIndexCounter++;
	}
	return { arrDates, currentDayIndex };
};
const DateSlider = () => {
	// const { selectedDate } = useGlobalStateContext();
	const dispatch = useGlobalDispatchContext();

	const [dates, setDates] = useState({ arrDates: [], currentDayIndex: {} });
	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		focusOnSelect: true,
		slidesToShow: 5,
		slidesToScroll: 2,
		initialSlide: dates.currentDayIndex.dayIndex,
	};

	useEffect(() => {
		let tempDates = getDateArray();
		setDates({
			arrDates: tempDates.arrDates,
			currentDayIndex: tempDates.currentDayIndex,
		});
	}, []);

	useEffect(() => {
		dispatch({
			type: 'SET_DATE',
			date: dates.currentDayIndex,
		});
	}, [dates, dispatch]);

	return (
		<>
			<Slider {...settings} className='dateSlider mt-3 mb-2'>
				{dates.arrDates.map((date, index) => (
					<div className='date' key={index}>
						<CardDateSlider
							date={date}
							currentDayIndex={dates.currentDayIndex}
						/>
					</div>
				))}
			</Slider>
		</>
	);
};

export default DateSlider;
