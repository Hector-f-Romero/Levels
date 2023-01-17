import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { getArtistsRequest } from "../../api/artist.api";
import { createTrackRequest } from "../../api/track.api";

import FormInput from "../../components/FormInput";
import { normalizeSelectValues } from "../../helpers/normalize-data";

const CreateFeaturings = () => {
	const [availableFeaturings, setAvailableFeaturings] = useState([]);
	const [featuringList, setFeaturingList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [trackData, setTrackData] = useState({});

	const { state } = useLocation();

	const {
		register,
		handleSubmit,
		getValues,
		reset,
		resetField,
		watch,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		setLoading(true);
		loadData();
		reset();
	}, []);

	const loadData = async () => {
		const resArtists = await getArtistsRequest();
		const { data } = state;
		setTrackData(data);
		const deletePrimaryArtist = await resArtists.filter((artist) => artist.idArtist !== data.idPrimaryArtist);
		const featurings = normalizeSelectValues(deletePrimaryArtist);
		setAvailableFeaturings(featurings);
		setLoading(false);
	};

	const addFeaturing = () => {
		// Get the ID of the featuring artist
		const idFeaturing = Number(getValues("idFeaturingArtist"));
		// Get all the information of this artists
		const featuring = availableFeaturings.find((feat) => feat.value === idFeaturing);
		setFeaturingList([...featuringList, featuring]);
		// Delete that artist in the list of featurings
		const newList = availableFeaturings.filter((feat) => feat.value !== idFeaturing);
		setAvailableFeaturings(newList);

		// Reset the value of select with the first element of the array of possible featuring artist
		resetField("idFeaturingArtist", { defaultValue: availableFeaturings[0].value });
	};

	const deleteFeaturing = (value) => {
		const featuringToDelete = featuringList.find((feat) => feat.value === value);
		const newFeaturingList = featuringList.filter((feat) => feat.value !== value);
		setFeaturingList(newFeaturingList);
		setAvailableFeaturings([...availableFeaturings, featuringToDelete]);
	};

	const onSubmit = async (data) => {
		let idFeaturings = [];

		if (featuringList) {
			idFeaturings = featuringList.map((ft) => ft.value);
		}

		const res = await createTrackRequest({ trackData, featurings: idFeaturings, pathTrack: data.pathTrack });
		console.log(res);
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

	if (loading) {
		return <h1>Loading...</h1>;
	}

	const inputs = [
		{
			id: 1,
			name: "pathTrack",
			label: "Audio track",
			type: "file",
			accept: "audio/*",
			multiple: false,
			validationProps: {
				required: "Duration cannot be empty.",
			},
		},
		{ id: 2, name: "existsFeaturings", label: "Exits featurings?", type: "checkbox" },
		{
			id: 3,
			name: `idFeaturingArtist`,
			label: `Featuring artist`,
			type: "select",
			options: availableFeaturings,
			dynamic: {
				field: "existsFeaturings",
				value: true,
			},
		},
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
						watchFields={["existsFeaturings"]}
						watch={watch}
					/>
				))}
				<input type="button" value="add" onClick={addFeaturing} />
				{featuringList.map((feat) => (
					<div key={feat.value}>
						<h4>{feat.text}</h4>
						<input type="button" value="Delete" onClick={() => deleteFeaturing(feat.value)} />
					</div>
				))}
				<div className="center-container">
					<input type="submit" value={"Submit"} className="btn-submit" />
				</div>
			</form>
		</div>
	);
};

export default CreateFeaturings;
