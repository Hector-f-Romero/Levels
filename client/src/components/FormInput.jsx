import React from "react";
import { useState } from "react";

const FormInput = (props) => {
	const { label, onChange, errorMessage, id, ...inputProps } = props;
	const [focused, setFocused] = useState(false);

	const handleFocus = (e) => {
		setFocused(true);
	};

	return (
		<div className="form-input">
			<label htmlFor="">{label}</label>
			<input {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()} />
			<span className="input-error">{errorMessage}</span>
		</div>
	);
};

export default FormInput;
