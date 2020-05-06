import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';

import {
	FETCH_CATEGORY_EVENTS_QUERY,
	FETCH_CATEGORIES_QUERY
} from '../util/graphql';

const DeleteButton = ({
	eventId,
	commentId,
	category,
	callback,
	categoryId
}) => {
	const [show, setShow] = useState(false);

	const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_EVENT_MUTATION;

	const [deleteEventOrCommentMutation] = useMutation(mutation, {
		update(proxy) {
			setShow(false);

			if (!commentId && category) {
				const data = proxy.readQuery({
					query: FETCH_CATEGORY_EVENTS_QUERY,
					variables: { categoryId }
				});
				proxy.writeQuery({
					query: FETCH_CATEGORY_EVENTS_QUERY,
					variables: { categoryId },
					data: {
						getEventsCategory: data.getEventsCategory.filter(
							event => event._id.toString() !== eventId
						)
					}
				});

				const prevData = proxy.readQuery({
					query: FETCH_CATEGORIES_QUERY
				});
				proxy.writeQuery({
					query: FETCH_CATEGORIES_QUERY,
					data: {
						getCategories: prevData.getCategories.forEach(category => {
							if (category._id.toString() === categoryId) {
								category.eventCount -= 1;
							}
						})
					}
				});
			}

			if (callback) callback();
		},
		variables: { eventId, commentId }
	});

	return (
		<>
			<OverlayTrigger
				placement='bottom'
				overlay={
					<Tooltip id='tooltip-delete-post'>
						{commentId ? 'Kommentar löschen!' : 'Event löschen!'}
					</Tooltip>
				}
			>
				<Button
					className='float-right delete-button'
					variant='danger'
					onClick={() => setShow(true)}
				>
					<i className='icon-trash'></i>
				</Button>
			</OverlayTrigger>

			<Modal show={show} onHide={() => setShow(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>
						{commentId ? 'Diesen Kommentar löschen?' : 'Dieses Event löschen?'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button variant='secondary' onClick={() => setShow(false)}>
						Nein
					</Button>
					<Button variant='primary' onClick={deleteEventOrCommentMutation}>
						Ja
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

const DELETE_EVENT_MUTATION = gql`
	mutation deleteEvent($eventId: ID!) {
		deleteEvent(eventId: $eventId)
	}
`;

const DELETE_COMMENT_MUTATION = gql`
	mutation deleteComment($eventId: ID!, $commentId: ID!) {
		deleteComment(eventId: $eventId, commentId: $commentId) {
			_id
			name
			comments {
				_id
				body
			}
			commentCount
		}
	}
`;

export default DeleteButton;
