import React from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";

import { createAlbumRequest } from "../../api/album.api";
import FormInput from "../../components/FormInput";

const MySwal = withReactContent(Swal);

const CreateAlbum = () => {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		const res = await createAlbumRequest(data);
		MySwal.fire({
			title: "Album created!",
			text: `Album ${data.titleAlbum} was created successfully.`,
			icon: "success",
			confirmButtonText: "Get it, show me",
			color: "#FFF",
			background: "#303030",
			confirmButtonColor: "#6d6d6d",
		}).then((result) => {
			if (result.isConfirmed) {
				navigate("/albums");
			}
		});
		console.log(res);
		// reset();
	};

	const inputs = [
		{
			id: 1,
			name: "titleAlbum",
			label: "Title Album",
			type: "text",
			placeholder: "Title of Album",
			validationProps: {
				required: "Title cannot be empty.",
				maxLength: {
					value: 50,
					message: "Release date should be 4 chars long.",
				},
				minLength: {
					value: 1,
					message: "Release date should be 4 chars long.",
				},
			},
		},

		{
			id: 2,
			name: "releaseDate",
			label: "Release Date",
			type: "text",
			placeholder: "2020",
			validationProps: {
				required: "Release date cannot be empty.",
				maxLength: {
					value: 4,
					message: "Release date should be 4 chars long.",
				},
				minLength: {
					value: 4,

					message: "Release date should be 4 chars long.",
				},
			},
		},
		{
			id: 3,
			name: "label",
			label: "Label",
			type: "text",
			placeholder: "Fania Records",
			validationProps: {
				required: "Label cannot be empty.",
				maxLength: {
					value: 25,
					message: "Duration should be at least 3 at most 25 chars long.",
				},
				minLength: {
					value: 3,

					message: "Duration should be at least 3 at most 25 chars long.",
				},
			},
		},
		{
			id: 4,
			name: "coverAlbum",
			label: "Album cover",
			type: "file",
			validationProps: {
				required: "Album cover cannot be empty.",
			},
		},
	];

	return (
		<div className="form-container">
			<h1>Create album</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				{inputs.map((input) => (
					<FormInput key={input.id} register={register} settings={input} errors={errors} watch={watch} />
				))}
				<div className="center-container">
					<input type="submit" value={"Submit"} className="btn-submit" />
				</div>
			</form>
		</div>
	);
};

export default CreateAlbum;
