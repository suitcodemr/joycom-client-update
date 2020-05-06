import React, { useContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
	Accordion,
	Card,
	Container,
	Col,
	Row,
	Jumbotron,
	Spinner,
	Button
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import {
	FETCH_CATEGORY_EVENTS_QUERY,
	FETCH_CATEGORIES_QUERY
} from '../util/graphql';
import EventItem from '../components/EventItem';
import EventForm from '../components/EventForm';

const CategoryPage = props => {
	const categoryId = props.match.params.categoryId;
	const [categoryName, setCategoryName] = useState('');
	const [isEventCount, setIsEventCount] = useState(null);
	const { user } = useContext(AuthContext);
	let history = useHistory();

	const { data: dataFCEQ, loading: loadingFCEQ } = useQuery(
		FETCH_CATEGORY_EVENTS_QUERY,
		{
			variables: { categoryId }
		}
	);

	const { data: dataFCQ } = useQuery(FETCH_CATEGORIES_QUERY);

	useEffect(() => {
		if (dataFCQ) {
			var currentCategory = dataFCQ.getCategories.filter(
				category => category._id === categoryId
			);
			setCategoryName(currentCategory[0].name);
			currentCategory[0].eventCount === 0
				? setIsEventCount(false)
				: setIsEventCount(true);
		}
	}, [categoryId, dataFCEQ, dataFCQ]);

	const pageBack = () => {
		history.go(-1);
	};

	const sendData = eventNewId => {
		history.push(`/singleEventPage/${eventNewId}`);
	};

	const categoryMarkup = (
		<>
			<div className='categoryPage pageWrapper'>
				<Container className='container-mobile'>
					<Jumbotron
						className={`jumbotron-categories jumbotron-${categoryId} text-white`}
					>
						<h1 className='page-header'>{categoryName}</h1>
						<p className='page-header-subtitle'></p>
					</Jumbotron>
				</Container>
				<Container>
					<h2 className='page-header--no-m text-center d-block'>
						Neueste Events
					</h2>
					<div className='categoryPageActions'>
						<Button className=' mt-3' onClick={() => pageBack()}>
							<span className='icon-categories'></span> zu den Kategorien
						</Button>
						{user && (
							<Accordion className='addEventAccordion'>
								<Card>
									<Accordion.Toggle
										className='mt-3 toggleButton'
										as={Button}
										variant='primary'
										eventKey='0'
									>
										<span className='icon-pencil'></span>
										Neues Event
									</Accordion.Toggle>

									<Accordion.Collapse eventKey='0'>
										<Card.Body>
											<EventForm
												categoryName={categoryName}
												categoryId={categoryId}
												callback={sendData}
											/>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
						)}
					</div>

					<Row>
						{dataFCEQ &&
							dataFCEQ.getEventsCategory.map((event, index) => (
								<Col key={index} xs={12} lg={6}>
									<EventItem event={event} categoryId={categoryId} />
								</Col>
							))}
					</Row>
				</Container>
			</div>
		</>
	);

	return (
		<>
			{isEventCount ? (
				<>
					{loadingFCEQ ? (
						<Spinner animation='border' variant='primary' />
					) : (
						<>{categoryMarkup}</>
					)}
				</>
			) : (
				<div className='categoryPage'>
					<Jumbotron
						className={`jumbotron-categories jumbotron-${categoryId} text-white`}
					>
						<Container>
							<h1 className='page-header'>{categoryName}</h1>
							<p className='page-header-subtitle'></p>
						</Container>
					</Jumbotron>
					<Container>
						<h2 className='page-header--no-m text-center d-block'>
							Neueste Events
						</h2>
						<div className='categoryPageActions'>
							<Button className=' mt-3' href='/'>
								zu den Kategorien
							</Button>
							{user && (
								<Accordion className='addEventAccordion'>
									<Card>
										<Accordion.Toggle
											className='mt-3 toggleButton'
											as={Button}
											variant='primary'
											eventKey='0'
										>
											Neues Event
										</Accordion.Toggle>

										<Accordion.Collapse eventKey='0'>
											<Card.Body>
												<EventForm
													categoryName={categoryName}
													callback={sendData}
													categoryId={categoryId}
												/>
											</Card.Body>
										</Accordion.Collapse>
									</Card>
								</Accordion>
							)}
						</div>

						<Row>
							<Col>
								<p className='mt-5'>
									Es existieren keine Events für die Kategorie...
								</p>
							</Col>
						</Row>
					</Container>
				</div>
			)}
		</>
	);
};
export default CategoryPage;
