import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../components/FormInput";

const CreateArtist = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const inputs = [
		{
			id: 1,
			name: "namesArtist",
			label: "Names",
			type: "text",
			placeholder: "José Antonio",
			validationProps: {
				maxLength: {
					value: 25,
					message: "Names should be at least 2 at most 25 chars long.",
				},
				minLength: {
					value: 2,
					message: "Names should be at least 2 at most 25 chars long.",
				},
			},
		},
		{
			id: 2,
			name: "lastNamesArtist",
			label: "Lastnames",
			type: "text",
			placeholder: "Torresola Ruiz",
			validationProps: {
				maxLength: {
					value: 25,
					message: "Lastnames should be at least 2 at most 25 chars long.",
				},
				minLength: {
					value: 2,
					message: "Lastnames should be at least 2 at most 25 chars long.",
				},
			},
		},
		{
			id: 3,
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
			id: 4,
			name: "bornDate",
			label: "Born date",
			type: "date",
			validationProps: { required: "Born date cannot be empty." },
		},
		{
			id: 5,
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
			id: 6,
			name: "typeArtist",
			label: "Type of artist",
			type: "select",
			options: [
				{ value: "Artist", text: "Artist" },
				{ value: "Group", text: "Group" },
			],
		},

		{
			id: 7,
			name: "artistPhoto",
			label: "Photo",
			placeholder: "Puerto Rico",
			type: "file",
			validationProps: {
				required: "Artist photo cannot be empty.",
			},
		},

		// 	},
		// 	{
		//
		// 	},
	];

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<>
			<h1>Create Artist</h1>
			<div className="form-container">
				<form onSubmit={handleSubmit(onSubmit)}>
					{/* <input type="text" {...register("namesArtist")} /> */}
					{inputs.map((input) => (
						<FormInput key={input.id} register={register} settings={input} errors={errors} />
					))}
					<input type="submit" value={"Submit"} className="btn-submit" />
				</form>
			</div>
		</>
	);
};

export default CreateArtist;
