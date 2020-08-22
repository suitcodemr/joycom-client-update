import React from 'react';
import { Card } from 'react-bootstrap';

// Context
import { useGlobalDispatchContext } from '../context/globalContext';

const CategoryCard = ({ category, callbackCacheFCQ }) => {
	const dispatch = useGlobalDispatchContext();
	const { _id, name, eventCount } = category;

	const setCurrentCategory = () => {
		dispatch({ type: 'SET_CATEGORY', category });
		callbackCacheFCQ();
	};

	return (
		<>
			<Card
				className={`category bg-dark text-white category_${_id}`}
				onClick={setCurrentCategory}
			>
				<Card.Img src={require(`../assets/img/categoryThumbnail_${_id}.jpg`)} />
				<Card.ImgOverlay>
					<Card.Title>{name}</Card.Title>
					{eventCount < 1 ? (
						<></>
					) : (
						<>
							<div>
								<div className='card-link counter'>Events: {eventCount}</div>
								<div className='card-link arrow'></div>
							</div>
						</>
					)}
				</Card.ImgOverlay>
			</Card>
		</>
	);
};

export default CategoryCard;
