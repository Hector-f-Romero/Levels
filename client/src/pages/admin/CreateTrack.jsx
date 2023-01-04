import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { getAlbumsRequest } from "../../api/album.api";
import { getArtistsRequest } from "../../api/artist.api";
import { getGenresRequest } from "../../api/genre.api";
import FormInput from "../../components/FormInput";
import { normalizeSelectValues, transformDuration } from "../../helpers/normalize-data";

const CreateTrack = () => {
	const [albums, setAlbums] = useState([]);
	const [artists, setArtists] = useState([]);
	const [genres, setGenres] = useState([]);
	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		reset,
		resetField,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		getSelectsData();
		reset();
	}, []);

	const getSelectsData = async () => {
		const resGenres = await getGenresRequest();
		const resAlbums = await getAlbumsRequest();
		const resArtists = await getArtistsRequest();

		const albums = normalizeSelectValues(resAlbums);
		albums.unshift({ value: "", text: "No album" });

		setAlbums(albums);
		setGenres(normalizeSelectValues(resGenres));
		setArtists(normalizeSelectValues(resArtists));
		setLoading(false);
	};

	const onSubmit = async (data) => {
		if (data.releaseDate) {
			data.releaseDate = Number(data.releaseDate);
		}

		if (data.idAlbum === "") {
			data.idAlbum = null;
		}

		data.duration = transformDuration(data.duration);
		console.log(data);
		reset();
		navigate("/create/track/featurings", { state: { data } });
	};

	if (loading) {
		return <h1>Loading...</h1>;
	}

	const inputs = [
		{
			id: 1,
			name: "titleTrack",
			label: "Title track",
			type: "text",
			placeholder: "Un verano en Nueva York",
			validationProps: {
				required: "Title name cannot be empty.",
				maxLength: {
					value: 25,
					message: "Title track should be at least 1 at most 25 chars long.",
				},
				minLength: {
					value: 1,
					message: "Title track should be at least 1 at most 25 chars long.",
				},
			},
		},
		{
			id: 2,
			name: "duration",
			label: "Duration",
			type: "text",
			placeholder: "4:58",
			pattern: "/^d+:d{2}$/gm",
			validationProps: {
				required: "Duration cannot be empty.",
				maxLength: {
					value: 5,
					message: "Respect the number pattern 00:00",
				},
				minLength: {
					value: 4,
					message: "Duration should be at least 2 at most 25 chars long.",
				},
			},
		},
		{
			id: 3,
			name: "releaseDate",
			label: "Release date",
			type: "text",
			placeholder: "1975",
			validationProps: {
				required: "Duration cannot be empty.",
				maxLength: {
					value: 4,
					message: "Release Date should be 4 chars long.",
				},
				minLength: {
					value: 4,
					message: "Release Date should be 4 chars long",
				},
			},
		},
		{
			id: 4,
			name: "idGenre",
			label: "Track genre",
			type: "select",
			options: genres,
			validationProps: {
				required: "Track has to associated with a genre.",
			},
		},
		{
			id: 5,
			name: "idAlbum",
			label: "Track album",
			type: "select",
			options: albums,
			validationProps: {},
		},
		{
			id: 6,
			name: "idPrimaryArtist",
			label: "Primary artist",
			type: "select",
			options: artists,
			validationProps: {},
		},
		// {
		// 	id: 7,
		// 	name: "pathTrack",
		// 	label: "Audio track",
		// 	type: "file",
		// 	placeholder: "4:58",
		// 	pattern: "/^d+:d{2}$/gm",
		// 	validationProps: {
		// 		required: "Duration cannot be empty.",
		// 	},
		// },
		// {
		// 	id: 8,
		// 	name: "coverTrack",
		// 	label: "Cover Track",
		// 	type: "file",
		// 	placeholder: "4:58",
		// 	pattern: "/^d+:d{2}$/gm",
		// 	validationProps: {
		// 		required: "Duration cannot be empty.",
		// 	},
		// },
	];

	return (
		<div className="form-container">
			<h1>Create track</h1>
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

export default CreateTrack;
