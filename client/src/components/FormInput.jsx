import React from "react";

const FormInput = ({ register, errors, settings }) => {
	const { type, name, placeholder, label, validationProps } = settings;

	if (type === "select") {
		const { options } = settings;
		return (
			<div className="input-container">
				<label htmlFor={name} className="label-input">
					{label}
				</label>
				<select {...register(name)} className="form-input">
					{options.map((option) => (
						<option value={option.value}>{option.text}</option>
					))}
				</select>
			</div>
		);
	}

	return (
		<div className="input-container">
			<label htmlFor={name} className="label-input">
				{label}
			</label>
			<input type={type} placeholder={placeholder} {...register(name, validationProps)} className="form-input" />
			{errors[name] && <span className="input-error">{errors[name]["message"]}</span>}
		</div>
	);
};

export default FormInput;
