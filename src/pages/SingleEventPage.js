import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import {
	Card,
	Container,
	Button,
	Image,
	OverlayTrigger,
	Tooltip
} from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/de';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { FETCH_EVENT_QUERY, FETCH_CATEGORIES_QUERY } from '../util/graphql';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import CommentButton from '../components/CommentButton';
import Comments from '../components/Comments';

import { AuthContext } from '../context/auth';

const SingleEventPage = props => {
	const { user } = useContext(AuthContext);
	const [categoryId, setCategoryId] = useState('');
	let history = useHistory();

	const eventId = props.match.params.eventId;
	const { data: dataFEQ, loading: loadingFEQ } = useQuery(FETCH_EVENT_QUERY, {
		variables: { eventId }
	});

	const { data: dataFCQ } = useQuery(FETCH_CATEGORIES_QUERY);

	useEffect(() => {
		if (!loadingFEQ) {
			if (dataFCQ) {
				var getCategoryId = dataFCQ.getCategories.forEach(category => {
					if (category.name === dataFEQ.getEvent.category) {
						console.log(category._id);
						setCategoryId(category._id);
					}
				});
			}
		}
	}, [dataFCQ, dataFEQ, loadingFEQ]);

	const [addUser] = useMutation(ADD_USER_MUTATION, {
		variables: { eventId }
	});

	const pageBack = () => {
		history.go(-1);
	};

	function deleteEventCallback() {
		history.go(-2);
	}

	function addUserReduceCount() {
		addUser();
		setTimeout(() => {
			const elementValue = parseInt(
				document.getElementsByClassName('userCounter')[0].innerHTML
			);
			document.getElementsByClassName('userCounter')[0].innerHTML =
				elementValue - 1;
		}, 100);
	}

	function addUserAddCount() {
		addUser();
		setTimeout(() => {
			const elementValue = parseInt(
				document.getElementsByClassName('userCounter')[0].innerHTML
			);
			document.getElementsByClassName('userCounter')[0].innerHTML =
				elementValue + 1;
		}, 100);
	}

	function scrollToCommentForm() {
		window.scrollBy({ top: 300, left: 0, behavior: 'smooth' });
	}

	if (dataFEQ) {
		const {
			_id,
			name,
			body,
			category,
			creator,
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
		} = dataFEQ.getEvent;

		var eventMarkup = (
			<>
				<div className='singleEventPage pageWrapper'>
					<Container>
						<div className='singlePageActions'>
							<Button onClick={() => pageBack()}>
								<span className='icon-left-circle'></span>
								Zurück
							</Button>
							<Link to='/' className='btn btn btn-primary'>
								<span className='icon-categories'></span> zu den Kategorien
							</Link>
						</div>
						<Card className='event'>
							<Card.Body className='card-top'>
								<Card.Title>{name}</Card.Title>
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
									onClick={() => scrollToCommentForm()}
								/>
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
							<Card.Body>{body}</Card.Body>
							<Card.Body className='card-bottom'>
								<div className='maxMembers'>
									<p>Plätze frei</p>
									<p className='userCounter'>
										{maxUsers - userCount === 0 ? '0' : maxUsers - userCount}
									</p>
								</div>
								<div className='userList'>
									<p>Teilnehmer:</p>

									{userList.map((userListItem, index) => (
										<OverlayTrigger
											key={index}
											placement='bottom'
											overlay={
												<Tooltip id='tooltip-disabled'>
													{userListItem.username}
												</Tooltip>
											}
										>
											<Image
												src={require(`../assets/img/avatar-${userListItem.avatar}.png`)}
											/>
										</OverlayTrigger>
									))}
								</div>
							</Card.Body>
							<Card.Body className='card-action'>
								<p className='creator'>erstellt von {creator}</p>
								{user && user.username === creator ? (
									<DeleteButton
										eventId={_id}
										callback={deleteEventCallback}
										category={category}
										categoryId={categoryId}
									/>
								) : user ? (
									userList.find(
										userItem => userItem.username === user.username
									) ? (
										//cross Button
										<OverlayTrigger
											overlay={
												<Tooltip id='tooltip-disabled'>
													{'Nicht mehr teilnehmen!'}
												</Tooltip>
											}
										>
											<Button
												variant='warning'
												className='icon-plus-circle icon-plus-circle-cross'
												onClick={addUserAddCount}
											></Button>
										</OverlayTrigger>
									) : maxUsers - userCount === 0 ? (
										//disabled Button
										<OverlayTrigger
											overlay={
												<Tooltip id='tooltip-disabled'>
													{'Keine freien mehr Plätze mehr!'}
												</Tooltip>
											}
										>
											<Button
												disabled
												variant='info'
												className='icon-plus-circle'
												onClick={addUser}
											></Button>
										</OverlayTrigger>
									) : (
										//addUser
										<OverlayTrigger
											overlay={
												<Tooltip id='tooltip-disabled'>
													{'Nehmen Sie am Event teil!'}
												</Tooltip>
											}
										>
											<Button
												variant='info'
												className='icon-plus-circle'
												onClick={addUserReduceCount}
											></Button>
										</OverlayTrigger>
									)
								) : (
									<>
										<OverlayTrigger
											overlay={
												<Tooltip id='tooltip-disabled'>{'Zum Login!'}</Tooltip>
											}
										>
											<Link
												to='/login'
												className='icon-plus-circle btn btn-info'
											></Link>
										</OverlayTrigger>
									</>
								)}
							</Card.Body>
						</Card>

						{user && (
							<Card className='comments'>
								<Comments
									eventId={eventId}
									comments={comments}
									category={category}
								/>
							</Card>
						)}
					</Container>
				</div>
			</>
		);
	}

	return <>{eventMarkup}</>;
};

const ADD_USER_MUTATION = gql`
	mutation addUser($eventId: ID!) {
		addUser(eventId: $eventId) {
			_id
			name
			creator
			userList {
				_id
				username
				avatar
			}
			location
			maxUsers
			category
		}
	}
`;

export default SingleEventPage;
