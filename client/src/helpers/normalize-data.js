const normalizeSelectVales = (data) => {
	const normalizedData = [];

	for (const iterator of data) {
		let normalizedItem = { value: "", text: "" };
		const { idGenre, idAlbum, idArtist } = iterator;
		if (idGenre) {
			const { nameGenre } = iterator;
			normalizedItem.value = idGenre;
			normalizedItem.text = nameGenre;
			// const value = iterator.idGenre;
			// const text = iterator.nameGenre;
			// delete iterator["idGenre"];
			// delete iterator["nameGenre"];
			// iterator.value = value;
			// iterator.text = text;
		}

		if (idAlbum) {
			const { titleAlbum } = iterator;
			normalizedItem.value = idAlbum;
			normalizedItem.text = titleAlbum;
		}

		if (idArtist) {
			const { stageName } = iterator;
			normalizedItem.value = idArtist;
			normalizedItem.text = stageName;
		}

		normalizedData.push(normalizedItem);
	}

	return normalizedData;
};

export { normalizeSelectVales };
