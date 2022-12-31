import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import { getAlbumsRequest } from "../../api/album.api";
import { getArtistsRequest } from "../../api/artist.api";
import { getGenresRequest } from "../../api/genre.api";
import FormInput from "../../components/FormInput";
import { normalizeSelectVales } from "../../helpers/normalize-data";

const CreateTrack = () => {
	const [albums, setAlbums] = useState([]);
	const [artists, setArtists] = useState([]);
	const [genres, setGenres] = useState([]);
	const [loading, setLoading] = useState(false);

	const [featuringList, setFeaturingList] = useState([]);
	const [availableArtists, setAvailableArtists] = useState([]);
	const [disabledList, setDisabledList] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		reset,
		resetField,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		setLoading(true);
		getSelectsData();
		reset();
	}, []);

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
		},
		{
			id: 6,
			name: "idPrimaryArtist",
			label: "Primary artist",
			type: "select",
			options: artists,
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

	const getSelectsData = async () => {
		const resGenres = await getGenresRequest();
		const resAlbums = await getAlbumsRequest();
		const resArtists = await getArtistsRequest();

		const albums = normalizeSelectVales(resAlbums);
		albums.unshift({ value: 0, text: "No album" });

		setAlbums(albums);
		setGenres(normalizeSelectVales(resGenres));
		setArtists(normalizeSelectVales(resArtists));
		setAvailableArtists(normalizeSelectVales(resArtists));
		setLoading(false);
	};

	const onSubmit = async (data) => {
		console.log(data);
		// reset();
		Swal.fire({
			title: "Track created!",
			text: `Track ${data.titleTrack} was created successfully.`,
			icon: "success",
			confirmButtonText: "Get it",
			color: "#FFF",
			background: "#303030",
			confirmButtonColor: "#6d6d6d",
		});
	};

	const addFeaturing = (e) => {
		e.preventDefault();
		setFeaturingList([...featuringList, availableArtists]);

		if (featuringList.length < availableArtists.length - 1) {
			setDisabledList(false);
		} else {
			setDisabledList(true);
		}
	};

	const deleteFeaturing = (e, index) => {
		e.preventDefault();
		const list = [...featuringList];
		list.splice(index, 1);
		setFeaturingList(list);
		if (featuringList.length <= availableArtists.length) {
			setDisabledList(false);
		} else {
			setDisabledList(true);
		}
	};

	if (loading) {
		return <h1>Loading...</h1>;
	}

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
				{/* {featuringList.length < availableArtists.length ? (
					
				) : null} */}
				<button onClick={(e) => addFeaturing(e)} disabled={disabledList}>
					Add featuring artist
				</button>
				{featuringList.map((featuring, index) => (
					<div key={index}>
						<FormInput
							register={register}
							settings={{
								id: 6,
								name: "idPrimaryArtist",
								label: "Primary artist",
								type: "select",
								options: availableArtists,
							}}
							errors={errors}
						/>
						<button onClick={(e) => deleteFeaturing(e)}>Delete featuring</button>
					</div>
				))}

				<div className="center-container">
					<input type="submit" value={"Submit"} className="btn-submit" />
				</div>
			</form>
		</div>
	);
};

export default CreateTrack;
