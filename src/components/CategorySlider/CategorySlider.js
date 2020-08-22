import React, { useEffect } from 'react';
import Slider from 'react-slick';

import { Button } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';

// components
import CategoryCard from '../CategoryCard';

// Context
import {
	useGlobalStateContext,
	useGlobalDispatchContext,
} from '../../context/globalContext';

import { FETCH_CATEGORIES_QUERY } from '../../util/graphql';

import { useApolloClient } from '@apollo/react-hooks';

const CategorySlider = ({ data }) => {
	const { selectedCategory } = useGlobalStateContext();
	const dispatch = useGlobalDispatchContext();
	const client = useApolloClient();

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		focusOnSelect: true,
		slidesToShow: 3,
		slidesToScroll: 1,
	};

	useEffect(() => {
		dispatch({
			type: 'SET_CATEGORY',
			category: data.getCategories[0],
		});
	}, [data, dispatch]);

	const callbackCacheFCQ = () => {
		if (selectedCategory) {
			const cacheFCQ = client.readQuery({
				query: FETCH_CATEGORIES_QUERY,
			});
			let tempArr = cacheFCQ;
			let newArr = [];
			var firstElement = tempArr.getCategories[0];
			for (let i = 1; i < tempArr.getCategories.length; i++) {
				if (tempArr.getCategories[i]._id === selectedCategory._id) {
					newArr.push(tempArr.getCategories[i]);
				} else if (
					tempArr.getCategories[i]._id !== selectedCategory._id &&
					newArr.length > 0
				) {
					newArr.push(tempArr.getCategories[i]);
				} else {
					newArr.push(tempArr.getCategories[i]);
				}
			}
			newArr.push(firstElement);

			client.writeQuery({
				query: FETCH_CATEGORIES_QUERY,
				data: {
					getCategories: newArr,
				},
			});
		}
	};

	return (
		<>
			<Slider {...settings} className='categorySlider mt-3 mb-2'>
				{data.getCategories
					.filter((category) => category.events.length > 0)
					.map((category, index) => (
						<div className='category' key={index}>
							<CategoryCard
								category={category}
								callbackCacheFCQ={callbackCacheFCQ}
							/>
							{selectedCategory._id === category._id && (
								<LinkContainer to={`/categoryPage/${selectedCategory._id}`}>
									<Button variant='info'>{selectedCategory.name}</Button>
								</LinkContainer>
							)}
						</div>
					))}
			</Slider>
		</>
	);
};

export default CategorySlider;
