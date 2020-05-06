import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const LikeButton = ({ user, eventId, likes, likeCount }) => {
	const [liked, setLiked] = useState(false);
	
	useEffect(() => {
		if (user && likes.find(like => like.username === user.username)) {
			setLiked(true);
		} else {
			setLiked(false);
		}
	}, [user, likes]);

	const [likePost] = useMutation(LIKE_POST_MUTATION, {
		variables: { eventId }
	});

	const likeButton = user ? (
		liked ? (
			<OverlayTrigger
				overlay={<Tooltip id='tooltip-disabled'>{'Unlike!'}</Tooltip>}
			>
				<span className=' like-comment-wrapper'>
					<span
						onClick={likePost}
						className='card-likes icon-heart-full icon-red mr-1'
					></span>
					<span>{likeCount}</span>
				</span>
			</OverlayTrigger>
		) : (
			<OverlayTrigger
				overlay={<Tooltip id='tooltip-disabled'>{'Liken!'}</Tooltip>}
			>
				<span className='like-comment-wrapper'>
					<span
						className='card-likes icon-heart mr-1'
						onClick={likePost}
					></span>
					<span>{likeCount}</span>
				</span>
			</OverlayTrigger>
		)
	) : (
		<OverlayTrigger
			overlay={<Tooltip id='tooltip-disabled'>{'Liken!'}</Tooltip>}
		>
			<LinkContainer to='/login'>
				<span className='like-comment-wrapper'>
					<span
						className={
							likeCount > 0
								? 'icon-heart-full card-likes mr-1'
								: 'icon-heart card-likes mr-1'
						}
					></span>
					<span>{likeCount}</span>
				</span>
			</LinkContainer>
		</OverlayTrigger>
	);

	return <>{likeButton}</>;
};

const LIKE_POST_MUTATION = gql`
	mutation likeEvent($eventId: ID!) {
		likeEvent(eventId: $eventId) {
			_id
			likes {
				_id
				username
			}
			likeCount
		}
	}
`;

export default LikeButton;
