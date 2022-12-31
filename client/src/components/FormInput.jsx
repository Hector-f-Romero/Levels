import React from "react";

import { FiChevronDown } from "react-icons/fi";

const FormInput = ({ register, errors, settings, watchFields, watch, resetField, fieldsToReset }) => {
	const { type, name, placeholder, label, dynamic, validationProps } = settings;

	let watchValues;
	if (watchFields) {
		watchValues = watch(watchFields);
	}

	// Hidden inputs excluisive of artist or group
	if (dynamic) {
		let showField = dynamic ? watchValues[0] === dynamic["value"] : true;
		if (!showField) return;
	}

	// Don't reset select input.
	const resetFields = (fields) => {
		if (!fields) {
			return;
		}

		fields.map((field) => {
			resetField(field);
		});
	};

	if (type === "select") {
		const { options } = settings;
		return (
			<div className="input-container">
				<label htmlFor={name} className="label-input">
					{label}
				</label>
				<select
					{...register(name, {
						onChange: (e) => {
							if (resetFields) {
								resetFields(fieldsToReset);
							}
						},
					})}
					className="form-input select-input">
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.text}
						</option>
					))}
				</select>
				<div className="icon-select-container">
					<FiChevronDown />
				</div>
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
