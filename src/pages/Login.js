import React, { useState, useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { LinkContainer } from 'react-router-bootstrap';
import {
	Container,
	Row,
	Col,
	Button,
	Form,
	ListGroup,
	Jumbotron
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

const Login = () => {
	const authContext = useContext(AuthContext);
	let history = useHistory();

	const [validated, setValidated] = useState(false);
	const [errors, setErrors] = useState({});

	const initalState = {
		username: '',
		password: ''
	};

	const { onChange, onSubmit, values } = useForm(
		loginUserCallback,
		initalState
	);

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(_, { data: { login: userData } }) {
			authContext.login(userData);
			history.push('/');
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values
	});

	function loginUserCallback() {
		setValidated(true);
		loginUser();
	}

	return (
		<>
			<Jumbotron className='jumbotron-login'>
				<Container>
					<Row>
						<Col xs={12} md={6} lg={4}>
							<div className='form-wrapper'>
								<h2 className='page-header'>Einloggen</h2>
								<p className='page-header-subtitle'>
									... und Treffen vereinbaren!
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
											type='password'
											placeholder='Passwort...'
											name='password'
											value={values.password}
											required
											onChange={onChange}
										/>
									</Form.Group>

									<div className='buttons d-flex justify-content-between align-items-center'>
										<Button variant='primary' type='submit'>
											Einloggen
										</Button>
										<span>oder</span>
										<LinkContainer to='/register'>
											<Button variant='info'>Jetzt Registrieren!</Button>
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

const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			_id
			email
			username
			createdAt
			token
		}
	}
`;

export default Login;
