import React, { useContext, useEffect } from "react";
import { getAlbumsWithArtistRequest } from "../api/album.api";
import AlbumCard from "../components/AlbumCard";
import { DataContext } from "../context/dataContext";

const Albums = () => {
	const { data, setData, loadingData, setLoadingData } = useContext(DataContext);

	const getAlbums = async () => {
		setLoadingData(true);
		const res = await getAlbumsWithArtistRequest();
		setData(res);
		setLoadingData(false);
	};

	useEffect(() => {
		getAlbums();
	}, []);

	return (
		<>
			<h1>Albums view</h1>
			<div className="albums-container">
				{data.map((album) => (
					<AlbumCard key={album.idAlbum} dataInfo={album} />
				))}
			</div>
		</>
	);
};

export default Albums;
