import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CommentButton = ({ user, eventId, comments, commentCount }) => {
	const [commented, setCommented] = useState(false);

	useEffect(() => {
		if (user && comments.find(comment => comment.username === user.username)) {
			setCommented(true);
		} else {
			setCommented(false);
		}
	}, [user, comments]);

	const commentButtonMarkup = user ? (
		commented ? (
			<OverlayTrigger
				overlay={
					<Tooltip id='tooltip-disabled'>{'zu den Kommentaren'}</Tooltip>
				}
			>
				<LinkContainer to={`/singleEventPage/${eventId}`}>
					<span className=' like-comment-wrapper ml-0'>
						<span className='card-comments icon-comment-full icon-blue mr-1'></span>
						<span>{commentCount}</span>
					</span>
				</LinkContainer>
			</OverlayTrigger>
		) : (
			<OverlayTrigger
				overlay={<Tooltip id='tooltip-disabled'>{'Kommentieren!'}</Tooltip>}
			>
				<LinkContainer to={`/singleEventPage/${eventId}`}>
					<span className=' like-comment-wrapper ml-0'>
						<span className='card-comments icon-comment mr-1'></span>
						<span>{commentCount}</span>
					</span>
				</LinkContainer>
			</OverlayTrigger>
		)
	) : (
		<OverlayTrigger
			overlay={<Tooltip id='tooltip-disabled'>{'Kommentieren!'}</Tooltip>}
		>
			<LinkContainer to='/login'>
				<span className='like-comment-wrapper ml-0'>
					<span
						className={
							commentCount > 0
								? 'icon-comment-full card-comments mr-1'
								: 'icon-comment card-comments mr-1'
						}
					></span>
					<span>{commentCount}</span>
				</span>
			</LinkContainer>
		</OverlayTrigger>
	);

	return <>{commentButtonMarkup}</>;
};

export default CommentButton;
