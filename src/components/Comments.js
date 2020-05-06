import React, { useState, useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import moment from 'moment';
import 'moment/locale/de';
import { Button, Form, Card } from 'react-bootstrap';

import DeleteButton from './DeleteButton';
import { AuthContext } from '../context/auth';

const Comments = ({ eventId, comments, category }) => {
	const { user } = useContext(AuthContext);
	const [comment, setComment] = useState('');

	const onChange = e => {
		setComment(e.target.value);
	};

	const onSubmit = e => {
		e.preventDefault();
	};

	const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
		update() {
			setComment('');
		},
		variables: {
			eventId,
			body: comment
		}
	});

	return (
		<>
			{user && (
				<Form className='form-comments' onSubmit={onSubmit}>
					<h4 id='commentsHeader' className='page-header'>
						Kommentare
					</h4>
					<Form.Group className='d-flex'>
						<Form.Control
							as='textarea'
							rows='3'
							placeholder='Kommentar schreiben...'
							name='comment'
							value={comment}
							required
							onChange={onChange}
						/>
					</Form.Group>
					<Button
						className={user ? 'comment-button' : 'comment-button disabled'}
						variant='primary'
						type='submit'
						onClick={createComment}
						disabled={comment < 1 ? true : false}
					>
						Kommentieren
					</Button>
				</Form>
			)}

			{comments &&
				comments.map(comment => (
					<Card key={comment._id} className='comment'>
						<Card.Body className='card-top'>
							<div className='d-flex w-100'>
								<Card.Title>{comment.username}</Card.Title>
								<Card.Subtitle>
									vor {moment(comment.createdAt).fromNow(true)}
								</Card.Subtitle>
							</div>

							{user && user.username === comment.username && (
								<DeleteButton
									eventId={eventId}
									commentId={comment._id}
									category={category}
								/>
							)}
						</Card.Body>
						<Card.Body className='card-mid'>
							<p className='comment-body'>{comment.body}</p>
						</Card.Body>
					</Card>
				))}
		</>
	);
};

const CREATE_COMMENT_MUTATION = gql`
	mutation createComment($eventId: ID!, $body: String!) {
		createComment(eventId: $eventId, body: $body) {
			_id
			name
			comments {
				_id
				username
				createdAt
				body
			}
			commentCount
		}
	}
`;

export default Comments;
