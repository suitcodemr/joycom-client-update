import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Container, Row, Col, Button, Form, ListGroup } from 'react-bootstrap';
import DatePicker, { registerLocale } from 'react-datepicker';
import de from 'date-fns/locale/de';

import {
	FETCH_CATEGORIES_QUERY,
	FETCH_CATEGORY_EVENTS_QUERY
} from '../util/graphql';
import { useForm } from '../util/hooks';

const EventForm = ({ categoryName, categoryId, callback }) => {
	const [errors, setErrors] = useState({});
	const [selectCategory, setSelectCategory] = useState(categoryName);

	/**Datepicker**/
	const [date, setDate] = useState(new Date());

	registerLocale('de', de);
	const handleChange = date => {
		setDate(date);
	};
	/****/

	const [selectOption, setSelectOption] = useState('');
	const selectHandleChange = e => {
		setSelectOption(e.target.value);
	};

	const initalState = {
		name: '',
		location: '',
		time: '',
		duration: '',
		body: '',
		maxUsers: '',
		category: ''
	};

	const { data: dataFCQ } = useQuery(FETCH_CATEGORIES_QUERY);

	const { values, onChange, onSubmit } = useForm(
		createEventCallback,
		initalState
	);

	const valuesNew = {
		...values,
		time: date.toISOString(),
		duration: selectOption,
		category: selectCategory
	};

	const [createEvent] = useMutation(CREATE_EVENT_MUTATION, {
		variables: valuesNew,
		update(proxy, result) {
			const eventNewId = result.data.createEvent._id;

			const prevData = proxy.readQuery({
				query: FETCH_CATEGORY_EVENTS_QUERY,
				variables: { categoryId }
			});
			proxy.writeQuery({
				query: FETCH_CATEGORY_EVENTS_QUERY,
				variables: { categoryId },
				data: {
					getEventsCategory: [
						result.data.createEvent,
						...prevData.getEventsCategory
					]
				}
			});
			const prevData2 = proxy.readQuery({
				query: FETCH_CATEGORIES_QUERY
			});
			proxy.writeQuery({
				query: FETCH_CATEGORIES_QUERY,
				data: {
					getCategories: prevData2.getCategories.forEach(category => {
						if (category._id.toString() === categoryId) {
							category.eventCount += 1;
						}
					})
				}
			});

			callback(eventNewId);

			//Eingabefelder werden auf den Ausgangswert zurückgesetzt
			values.name = '';
			values.location = '';
			values.time = '';
			values.duration = '';
			values.body = '';
			values.maxUsers = '';
			values.category = '';
			setErrors({});
			setDate(new Date());
			setSelectCategory('');
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		}
	});

	function createEventCallback() {
		createEvent();
	}

	return (
		<>
			<div className='eventForm content-wrapper'>
				<Container>
					<Row>
						<Col xs={12}>
							<Form autoComplete='off' onSubmit={onSubmit}>
								<h3>Event erstellen:</h3>
								<Row>
									<Col md={6}>
										<Form.Group>
											<Form.Label>Name des Events:</Form.Label>
											<Form.Control
												placeholder=''
												name='name'
												onChange={onChange}
												value={values.name}
												maxLength='50'
											/>
										</Form.Group>
									</Col>
									<Col md={6}>
										<Form.Group>
											<Form.Label>Wo:</Form.Label>
											<Form.Control
												placeholder=''
												name='location'
												onChange={onChange}
												value={values.location}
												maxLength='50'
											/>
										</Form.Group>
									</Col>
								</Row>
								<Row>
									<Col md={4}>
										<Form.Group>
											<Form.Label>Beginn des Events:</Form.Label>
											<DatePicker
												className='form-control'
												name='time'
												selected={date}
												minDate={new Date()}
												onChange={handleChange}
												todayButton='Heute'
												showTimeSelect
												timeIntervals={30}
												timeCaption='Uhrzeit'
												locale='de'
												// isClearable
												// withPortal
												// inline

												value={date}
												dateFormat='d. MMM. yyyy, HH:mm'
												placeholderText='Zeit eingeben'
											/>
										</Form.Group>
									</Col>
									<Col md={4}>
										<Form.Group controlId='exampleForm.ControlSelect1'>
											<Form.Label>Dauer des Events:</Form.Label>
											<Form.Control
												name='duration'
												as='select'
												placeholder='Dauer des Events'
												onChange={selectHandleChange}
												value={selectOption}
											>
												<option disabled value=''></option>
												<option value='0.5'>30min</option>
												<option value='1'>1Std</option>
												<option value='1.5'>1.30Std</option>
												<option value='2'>2Std</option>
												<option value='2.5'>2.30Std</option>
												<option value='3'>3Std</option>
												<option value='3.5'>3.30Std</option>
											</Form.Control>
										</Form.Group>
									</Col>
									<Col md={4}>
										<Form.Group>
											<Form.Label>
												Teilnehmeranzahl (Anzahl incl. Veranstalter):
											</Form.Label>
											<Form.Control
												placeholder=''
												name='maxUsers'
												onChange={onChange}
												type='number'
												value={values.maxUsers}
												min='1'
												max='100'
											/>
										</Form.Group>
									</Col>
								</Row>
								<Row>
									<Col md={12}>
										<Form.Group>
											<Form.Label className='d-block'>Kategorie:</Form.Label>
											{dataFCQ &&
												dataFCQ.getCategories.map((category, index) => {
													return (
														<Form.Check
															key={`inline-radio-${index}`}
															inline
															value={category.name}
															checked={category.name === selectCategory}
															onChange={e => setSelectCategory(category.name)}
															name='category'
															label={category.name}
															type='radio'
															id={`inline-radio-${index}`}
														/>
													);
												})}
										</Form.Group>
									</Col>
									<Col md={12}>
										<Form.Group>
											<Form.Label>Kurze Beschreibung</Form.Label>
											<Form.Control
												as='textarea'
												rows='3'
												placeholder=''
												name='body'
												onChange={onChange}
												value={values.body}
											/>
										</Form.Group>
									</Col>
								</Row>

								<Form.Group>
									<Button
										className='float-right'
										variant='primary'
										type='submit'
									>
										Event erstellen
									</Button>
								</Form.Group>
							</Form>
							{Object.keys(errors).length > 0 && (
								<ListGroup className='mt-2'>
									{Object.values(errors).map(value => (
										<ListGroup.Item key={value} variant='danger'>
											{value}
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
};

const CREATE_EVENT_MUTATION = gql`
	mutation createEvent(
		$name: String!
		$location: String!
		$time: String!
		$duration: String!
		$body: String!
		$maxUsers: String!
		$category: String!
	) {
		createEvent(
			eventInput: {
				name: $name
				location: $location
				time: $time
				duration: $duration
				body: $body
				maxUsers: $maxUsers
				category: $category
			}
		) {
			_id
			name
			location
			time
			duration
			body
			creator
			userList {
				_id
				username
			}
			maxUsers
			category
			userCount
		}
	}
`;

export default EventForm;
