// npm-Pakete importieren
import React from 'react';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';

//Hauptkomponente von React importieren
import App from './App';

// GraphQL-HTTP-Link definieren
const httpLink = createHttpLink({
	// uri: 'https://pacific-temple-59426.herokuapp.com/',
	uri: 'http://localhost:5000/',
});

//Kontext definieren
const authLink = setContext(() => {
	const token = localStorage.getItem('jwtToken');
	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : '',
		},
	};
});

// Apollo-Client erstellen
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

// Apollo-Client als Kontext von React festlegen
export default (
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);
