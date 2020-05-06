import React, { useState, useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { LinkContainer } from 'react-router-bootstrap';
import {
	Container,
	Row,
	Col,
	Button,
	Image,
	Form,
	ListGroup,
	Jumbotron
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import avatar_1 from '../assets/img/avatar-0.png';
import avatar_2 from '../assets/img/avatar-1.png';
import avatar_3 from '../assets/img/avatar-2.png';
import avatar_4 from '../assets/img/avatar-3.png';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

const Register = props => {
	let history = useHistory();
	const authContext = useContext(AuthContext);
	const [errors, setErrors] = useState({});
	const [validated, setValidated] = useState(false);
	const [selectAvatar, setSelectAvatar] = useState('0');

	const { onChange, onSubmit, values } = useForm(registerUser, {
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const newValues = {
		...values,
		avatar: selectAvatar
	};

	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(_, { data: { register: userData } }) {
			authContext.login(userData);
			history.push('/');
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: newValues
	});

	function registerUser() {
		setValidated(true);
		addUser();
	}

	return (
		<>
			<Jumbotron className='jumbotron-register'>
				<Container>
					<Row>
						<Col xs={12} md={6} lg={4}>
							<div className='form-wrapper'>
								<h2 className='page-header'>Registrieren</h2>
								<p className='page-header-subtitle'>
									... und mit der Community in Kontakt treten.
								</p>
								<Form
									className={loading ? 'loading' : ''}
									onSubmit={onSubmit}
									noValidate
									validated={validated}
								>
									<Form.Group>
										<Form.Control
											type='text'
											placeholder='Benutzername...'
											name='username'
											value={values.username}
											required
											onChange={onChange}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Control
											type='email'
											placeholder='Email...'
											name='email'
											value={values.email}
											required
											onChange={onChange}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Control
											type='password'
											placeholder='Passwort...'
											name='password'
											value={values.password}
											required
											onChange={onChange}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Control
											type='password'
											placeholder='Passwort erneut eingeben...'
											name='confirmPassword'
											value={values.confirmPassword}
											required
											onChange={onChange}
										/>
										<Form.Text className='text-muted'>
											Wir werden Ihre Daten niemals an Dritte weitergeben. Ihre
											Daten sind bei uns sicher!{' '}
											<i className='far fa-thumbs-up'></i>
										</Form.Text>
									</Form.Group>
									<fieldset>
										<Form.Group>
											<div className='checkboxes-avatars'>
												<Form.Check
													inline
													value='avatar-1'
													checked={selectAvatar === '0'}
													onChange={e => setSelectAvatar('0')}
													name='avatar'
													type='radio'
													id='avatar-1'
												/>
												<Form.Check
													inline
													value='avatar-2'
													checked={selectAvatar === '1'}
													onChange={e => setSelectAvatar('1')}
													name='avatar'
													type='radio'
													id='avatar-2'
												/>
												<Form.Check
													inline
													value='avatar-3'
													checked={selectAvatar === '2'}
													onChange={e => setSelectAvatar('2')}
													name='avatar'
													type='radio'
													id='avatar-3'
												/>
												<Form.Check
													inline
													value='avatar-4'
													checked={selectAvatar === '3'}
													onChange={e => setSelectAvatar('3')}
													name='avatar'
													type='radio'
													id='avatar-4'
												/>
											</div>
											<div className='images-avatars'>
												<Image src={avatar_1} />
												<Image src={avatar_2} />
												<Image src={avatar_3} />
												<Image src={avatar_4} />
											</div>
										</Form.Group>
									</fieldset>

									<div className='buttons d-flex justify-content-between align-items-center'>
										<Button variant='primary' type='submit'>
											Registrieren
										</Button>
										<span>oder</span>
										<LinkContainer to='/login'>
											<Button variant='info'>Jetzt einloggen!</Button>
										</LinkContainer>
									</div>
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
							</div>
						</Col>
					</Row>
				</Container>
			</Jumbotron>
		</>
	);
};

const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
		$avatar: String!
	) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
				avatar: $avatar
			}
		) {
			_id
			email
			username
			avatar
			createdAt
			updatedAt
			token
		}
	}
`;

export default Register;
