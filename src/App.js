import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootswatch/dist/minty/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';

import './styles/style-icons.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/additional.css';

import { AuthProvider } from './context/auth';
import { GlobalProvider } from './context/globalContext';

import AuthRoute from './util/AuthRoute';

import NavBar from './components/NavBar';
import TopNavBar from './components/TopNavBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import MyAccount from './pages/MyAccount';
import AboutUs from './pages/AboutUs';
import AddEvent from './pages/AddEvent';
import Idea from './pages/Idea';
import CategoryPage from './pages/CategoryPage';
import SingleEventPage from './pages/SingleEventPage';

function App() {
	return (
		<>
			<GlobalProvider>
				<AuthProvider>
					<Router>
						<TopNavBar />
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
						<Route exact path='/addEvent' component={AddEvent} />
						<NavBar />
					</Router>
				</AuthProvider>
			</GlobalProvider>
		</>
	);
}

export default App;
