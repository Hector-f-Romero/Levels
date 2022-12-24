import React, { useState } from "react";
import { createAlbumRequest } from "../../api/album.api";

import FormInput from "../../components/FormInput";

const CreateAlbum = () => {
	const [values, setValues] = useState({
		titleAlbum: "",
		releaseDate: "",
		label: "",
		coverAlbum: "",
	});
	const [errors, setErrors] = useState([]);

	const inputs = [
		{
			id: 1,
			name: "titleAlbum",
			label: "Title Album",
			placeholder: "Title of Album",
			type: "text",
			maxLength: 50,
			minLength: 1,
			errorMessage: "Title cannot be empty.",
			required: true,
		},
		{
			id: 2,
			name: "releaseDate",
			label: "Release Date",
			placeholder: "2020",
			type: "text",
			maxLength: 4,
			minLength: 4,
			errorMessage: "Release Date cannot be empty.",
			required: true,
		},
		{
			id: 3,
			name: "label",
			label: "Label",
			placeholder: "Fania Records",
			type: "text",
			maxLength: 25,
			minLength: 3,
			errorMessage: "Label cannot be empty.",
			required: true,
		},
		{
			id: 4,
			name: "coverAlbum",
			label: "Album cover",
			type: "file",
			accept: ".jpg,.png,.jpeg,.webp",
			required: false,
		},
	];

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await createAlbumRequest(values);
		console.log(res);
	};

	return (
		<>
			<h1>Create album</h1>
			<form className="form-container" onSubmit={handleSubmit}>
				{inputs.map((input) => (
					<FormInput key={input.id} {...input} values={values[input.name]} onChange={onChange} />
				))}
				{errors !== null ? errors.map((e, index) => <p key={index}>{e.msg}</p>) : null}
				<button className="btn-submit">Submit</button>
			</form>
		</>
	);
};

export default CreateAlbum;
