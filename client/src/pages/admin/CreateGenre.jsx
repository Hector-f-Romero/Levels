import React from "react";
import { useForm } from "react-hook-form";
import { createGenreRequest } from "../../api/genre.api";
import FormInput from "../../components/FormInput";

const CreateGenre = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ defaultValues: { typeArtist: "Artist" } });

	const inputs = [
		{
			id: 1,
			name: "nameGenre",
			label: "Name",
			type: "text",
			placeholder: "Salsa",
			validationProps: {
				required: "Names cannot be empty.",
				maxLength: {
					value: 15,
					message: "Name should be at least 3 at most 15 chars long.",
				},
				minLength: {
					value: 3,
					message: "Name should be at least 3 at most 15 chars long.",
				},
			},
		},
	];

	const onSubmit = async (data) => {
		const res = await createGenreRequest(data);
		console.log(res);
		reset();
	};

	return (
		<div className="form-container">
			<h1>Create genre</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				{inputs.map((input) => (
					<FormInput key={input.id} register={register} settings={input} errors={errors} />
				))}
				<div className="center-container">
					<input type="submit" value={"Submit"} className="btn-submit" />
				</div>
			</form>
		</div>
	);
};

export default CreateGenre;
