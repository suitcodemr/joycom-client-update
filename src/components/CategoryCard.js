import React from 'react';
import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CategoryCard = ({ category }) => {
	const { _id, name, eventCount } = category;

	return (
		<>
			<LinkContainer to={`/categoryPage/${_id}`}>
				<Card className={`category bg-dark text-white category_${_id}`}>
					<Card.Img
						src={require(`../assets/img/categoryThumbnail_${_id}.jpg`)}
					/>
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
			</LinkContainer>
		</>
	);
};

export default CategoryCard;
