import React, { useState } from "react";
import { useEffect } from "react";

import { FiChevronDown } from "react-icons/fi";

const FormInput = ({ register, errors, settings, watchFields, watch, resetField, fieldsToReset }) => {
	const [image, setImage] = useState();
	const [previewImg, setPreviewImg] = useState("");
	const { type, name, placeholder, label, dynamic, validationProps } = settings;

	useEffect(() => {
		if (image) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewImg(reader.result);
			};
			reader.readAsDataURL(image);
		} else {
			setPreviewImg(null);
		}
	}, [image]);

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

	if (type === "file") {
		return (
			<div className="input-container">
				<label htmlFor={name} className="label-input">
					{label}
				</label>
				{/* <h3 className="upload-button">Upload file</h3> */}
				<input
					type={type}
					multiple={settings.multiple}
					accept={settings.accept}
					className="form-input"
					required={true}
					// className="my-input-file"
					{...register(name, {
						onChange: (e) => {
							const file = e.target.files[0];
							if (file && file.type.substr(0, 5) === "image") {
								setImage(file);
							} else {
								setImage(null);
							}
						},
					})}
				/>
				{previewImg ? (
					<>
						<figure className="img-preview">
							<img src={previewImg} alt="Preview image uploaded by user."></img>
							<figcaption>Preview image</figcaption>
						</figure>
					</>
				) : null}
				{errors[name] && <span className="input-error">{errors[name]["message"]}</span>}
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
