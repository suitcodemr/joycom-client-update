import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootswatch/dist/minty/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';

import './styles/style-icons.css';
import './styles/additional.css';

import { AuthProvider } from './context/auth';

import AuthRoute from './util/AuthRoute';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import MyAccount from './pages/MyAccount';
import AboutUs from './pages/AboutUs';
import Idea from './pages/Idea';
import CategoryPage from './pages/CategoryPage';
import SingleEventPage from './pages/SingleEventPage';
import Footer from './components/Footer';

function App() {
	return (
		<>
			<AuthProvider>
				<Router>
					<NavBar />
					<Route exact path='/' component={Home} />
					<AuthRoute exact path='/login' component={Login} />
					<AuthRoute exact path='/register' component={Register} />
					<Route exact path='/myAccount/:userId' component={MyAccount} />
					<Route exact path='/aboutUs' component={AboutUs} />
					<Route exact path='/idea' component={Idea} />
					<Route
						exact
						path='/categoryPage/:categoryId'
						component={CategoryPage}
					/>
					<Route
						exact
						path='/singleEventPage/:eventId'
						component={SingleEventPage}
					/>
				</Router>
				<Footer />
			</AuthProvider>
		</>
	);
}

export default App;
