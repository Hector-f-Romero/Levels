const normalizeSelectValues = (data) => {
	const normalizedData = [];

	for (const iterator of data) {
		let normalizedItem = { value: "", text: "" };
		const { idGenre, idAlbum, idArtist } = iterator;
		if (idGenre) {
			const { nameGenre } = iterator;
			normalizedItem.value = Number(idGenre);
			normalizedItem.text = nameGenre;
		}

		if (idAlbum) {
			const { titleAlbum } = iterator;
			normalizedItem.value = Number(idAlbum);
			normalizedItem.text = titleAlbum;
		}

		if (idArtist) {
			const { stageName } = iterator;
			normalizedItem.value = Number(idArtist);
			normalizedItem.text = stageName;
		}

		normalizedData.push(normalizedItem);
	}

	return normalizedData;
};

const transformDuration = (duration = "") => {
	const time = duration.split(":");
	let minutes = Number(time[0]);
	const seconds = Number(time[1]);
	minutes *= 60;
	const durationInSeconds = minutes + seconds;
	return durationInSeconds;
};

export { normalizeSelectValues, transformDuration };
