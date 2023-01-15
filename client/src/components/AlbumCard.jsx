import React from "react";
import { Link } from "react-router-dom";

const AlbumCard = ({ dataInfo }) => {
	return (
		<div className="album-card">
			<div className="album-cover">
				<img src={dataInfo.albumCover} alt="img de album" />
			</div>
			<Link to={`../album/${dataInfo.idAlbum}`} className="title-link">
				{dataInfo.titleAlbum}
			</Link>
			{dataInfo.artists !== undefined ? (
				dataInfo.artists.map((artist) => <h3 key={artist.idArtist}>{artist.stageName}</h3>)
			) : (
				<h1>Hola</h1>
			)}
			<h3>{dataInfo.releaseDate}</h3>
			<h3>{dataInfo.label}</h3>
		</div>
	);
};

export default AlbumCard;
