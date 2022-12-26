import React from "react";

import { FiChevronDown } from "react-icons/fi";

const FormInput = ({ register, errors, settings, watchFields, watch, resetField }) => {
	const { type, name, placeholder, label, dynamic, validationProps } = settings;

	let watchValues = watch(watchFields);

	// Hidden inputs excluisive of artist or group
	if (dynamic) {
		let showField = dynamic ? watchValues[0] === dynamic["value"] : true;
		if (!showField) return;
	}

	// Don't reset select input.
	const resetFields = () => {
		resetField("namesArtist");
		resetField("lastNamesArtist");
		resetField("stageName");
		resetField("bornDate");
		resetField("formedYear");
		resetField("countryOrigin");
		resetField("artistPhoto");
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
							resetFields();
						},
					})}
					className="form-input select-input">
					{options.map((option) => (
						<option key={option.id} value={option.value}>
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
