import React, { createContext, useReducer, useContext } from 'react';

// Define the context
const GlobalStateContext = createContext();
const GlobalDispatchContext = createContext();

// Reducer
const globalReducer = (state, action) => {
	switch (action.type) {
		case 'SET_DATE':
			return {
				...state,
				selectedDate: action.date,
			};
		case 'SET_CATEGORY':
			return {
				...state,
				selectedCategory: action.category,
			};
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
};

// GlobalProvider

const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(globalReducer, {
		// initalState
		selectedDate: {},
		selectedCategory: '',
	});
	return (
		<GlobalStateContext.Provider value={state}>
			<GlobalDispatchContext.Provider value={dispatch}>
				{children}
			</GlobalDispatchContext.Provider>
		</GlobalStateContext.Provider>
	);
};

// Custom hooks for when we want to use our global state
const useGlobalStateContext = () => useContext(GlobalStateContext);
const useGlobalDispatchContext = () => useContext(GlobalDispatchContext);

export { GlobalProvider, useGlobalStateContext, useGlobalDispatchContext };
