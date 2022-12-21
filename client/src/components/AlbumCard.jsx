import React from "react";

const AlbumCard = ({ dataInfo }) => {
	return (
		<div className="album-card">
			<div className="album-cover">
				<img src="" alt="img de album" />
			</div>
			<h2>{dataInfo.titleAlbum}</h2>
			{dataInfo.artists.map((artist) => (
				<h3 key={artist.idArtist}>{artist.stageName}</h3>
			))}
			<h3>{dataInfo.releaseDate}</h3>
			<h3>{dataInfo.label}</h3>
		</div>
	);
};

export default AlbumCard;
