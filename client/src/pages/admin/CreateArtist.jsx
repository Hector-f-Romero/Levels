import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { createArtistRequest } from "../../api/artist.api";
import FormInput from "../../components/FormInput";

const MySwal = withReactContent(Swal);

const CreateArtist = () => {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		resetField,
		formState: { errors },
	} = useForm({ defaultValues: { typeArtist: "Artist" } });

	const navigate = useNavigate();

	const inputs = [
		{
			id: 1,
			name: "typeArtist",
			label: "Type of artist",
			type: "select",
			options: [
				{ id: 1, value: "Artist", text: "Artist" },
				{ id: 2, value: "Group", text: "Group" },
			],
		},
		{
			id: 2,
			name: "namesArtist",
			label: "Names",
			type: "text",
			placeholder: "José Antonio",
			validationProps: {
				required: "Names cannot be empty.",
				maxLength: {
					value: 25,
					message: "Names should be at least 2 at most 25 chars long.",
				},
				minLength: {
					value: 2,
					message: "Names should be at least 2 at most 25 chars long.",
				},
			},
			dynamic: {
				field: "typeArtist",
				value: "Artist",
			},
		},
		{
			id: 3,
			name: "lastNamesArtist",
			label: "Lastnames",
			type: "text",
			placeholder: "Torresola Ruiz",
			validationProps: {
				required: "Lastnames cannot be empty.",
				maxLength: {
					value: 25,
					message: "Lastnames should be at least 2 at most 25 chars long.",
				},
				minLength: {
					value: 2,
					message: "Lastnames should be at least 2 at most 25 chars long.",
				},
			},
			dynamic: {
				field: "typeArtist",
				value: "Artist",
			},
		},
		{
			id: 4,
			name: "stageName",
			label: "Stage name",
			placeholder: "Frankie Ruiz",
			type: "text",
			validationProps: {
				required: "Stage name cannot be empty.",
				maxLength: {
					value: 25,
					message: "Stage name should be at least 2 at most 25 chars long.",
				},
				minLength: {
					value: 2,
					message: "Stage name should be at least 2 at most 25 chars long.",
				},
			},
		},
		{
			id: 5,
			name: "bornDate",
			label: "Born date",
			type: "date",
			validationProps: { required: "Born date cannot be empty." },
			dynamic: {
				field: "typeArtist",
				value: "Artist",
			},
		},
		{
			id: 6,
			name: "formedYear",
			label: "Formed year",
			placeholder: "2004",
			type: "text",
			validationProps: {
				required: "Formed year cannot be empty.",
				maxLength: {
					value: 4,
					message: "Stage name should be 4 chars long.",
				},
				minLength: {
					value: 4,
					message: "Stage name should be 4 chars long.",
				},
			},
			dynamic: {
				field: "typeArtist",
				value: "Group",
			},
		},
		{
			id: 7,
			name: "countryOrigin",
			label: "Country origin",
			placeholder: "Puerto Rico",
			type: "text",
			validationProps: {
				required: "Country origin cannot be empty.",
				maxLength: {
					value: 25,
					message: "Country origin should be at least 2 at most 25 chars long.",
				},
				minLength: {
					value: 2,
					message: "Country should be at least 2 at most 25 chars long.",
				},
			},
		},

		{
			id: 8,
			name: "artistPhoto",
			label: "Photo",
			placeholder: "Puerto Rico",
			type: "file",
			// validationProps: {
			// 	required: "Artist photo cannot be empty.",
			// },
		},
	];

	const onSubmit = async (data) => {
		if (data.formedYear) {
			const year = data.formedYear;
			delete data.formedYear;
			data.bornDate = `${year}-01-01`;
		}
		const res = await createArtistRequest(data);
		console.log(res);
		MySwal.fire({
			title: "Artist/Group created!",
			text: `Artist/Group ${data.stageName} was created successfully.`,
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
		reset();
	};

	return (
		<div className="form-container">
			<h1>Create artist or group</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				{inputs.map((input) => (
					<FormInput
						key={input.id}
						register={register}
						settings={input}
						errors={errors}
						watchFields={["typeArtist"]}
						watch={watch}
						resetField={resetField}
						fieldsToReset={[
							"namesArtist",
							"lastNamesArtist",
							"stageName",
							"bornDate",
							"formedYear",
							"countryOrigin",
							"artistPhoto",
						]}
					/>
				))}
				<div className="center-container">
					<input type="submit" value={"Submit"} className="btn-submit" />
				</div>
			</form>
		</div>
	);
};

export default CreateArtist;
