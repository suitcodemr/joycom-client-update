import React, { useContext } from 'react';
import { Card, Image, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import moment from 'moment';
import 'moment/locale/de';

import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

import CommentButton from './CommentButton';
import { AuthContext } from '../context/auth';

const EventItem = ({ event, categoryId }) => {
	const { user } = useContext(AuthContext);
	const {
		_id,
		name,
		creator,
		category,
		location,
		time,
		duration,
		maxUsers,
		userCount,
		userList,
		likes,
		likeCount,
		comments,
		commentCount
	} = event;

	return (
		<Card className='event'>
			<Card.Body className='card-top'>
				<Card.Title>{name}</Card.Title>
				<div className='counter-wrapper'>
					<LikeButton
						user={user}
						eventId={_id}
						likes={likes}
						likeCount={likeCount}
					/>
					<CommentButton
						user={user}
						eventId={_id}
						comments={comments}
						commentCount={commentCount}
					/>
				</div>
			</Card.Body>
			<Card.Body className='card-mid'>
				<p>
					Wo? <span>{location}</span>
				</p>
				<p>
					Wann?<span>{moment(time).format('lll')}</span>
				</p>
				<p>
					Dauer?<span>{duration}</span>
				</p>
			</Card.Body>
			<Card.Body className='card-bottom'>
				<div className='maxMembers'>
					<p>Plätze frei</p>
					<p>{maxUsers - userCount === 0 ? 'keine' : maxUsers - userCount}</p>
				</div>
				<div className='userList'>
					<p>Teilnehmer:</p>

					{userList.map((userListItem, index) => (
						<OverlayTrigger
							key={index}
							placement='bottom'
							overlay={
								<Tooltip id='tooltip-disabled'>{userListItem.username}</Tooltip>
							}
						>
							<Image
								key={index}
								src={require(`../assets/img/avatar-${userListItem.avatar}.png`)}
							/>
						</OverlayTrigger>
					))}
				</div>
			</Card.Body>
			<Card.Body className='card-action'>
				<p className='creator'>erstellt von {creator}</p>
				{user && user.username === creator ? (
					<>
						<DeleteButton
							eventId={_id}
							category={category}
							categoryId={categoryId}
						/>
						<OverlayTrigger
							overlay={
								<Tooltip id='tooltip-disabled'>{'mehr Informationen'}</Tooltip>
							}
						>
							<LinkContainer to={`/singleEventPage/${_id}`}>
								<Button variant='info'>
									<span className='icon-info'></span>
								</Button>
							</LinkContainer>
						</OverlayTrigger>
					</>
				) : (
					<OverlayTrigger
						overlay={
							<Tooltip id='tooltip-disabled'>{'mehr Informationen'}</Tooltip>
						}
					>
						<LinkContainer to={`/singleEventPage/${_id}`}>
							<Button variant='info'>
								<span className='icon-info'></span>
							</Button>
						</LinkContainer>
					</OverlayTrigger>
				)}
			</Card.Body>
		</Card>
		// </LinkContainer>
	);
};

export default EventItem;
