import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
	const [validated, setValidated] = useState(false);
	const [values, setValues] = useState(initialState);


	const onChange = event => {
		setValidated(true);
		setValues({
			...values,
			[event.target.name]: event.target.value
		});
	};

	const onSubmit = event => {
		event.preventDefault();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		callback();
		setValidated(false);
	};

	return {
		onChange,
		onSubmit,
		values,
		validated
	};
};
