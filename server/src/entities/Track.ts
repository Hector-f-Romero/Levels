import {
	Column,
	PrimaryGeneratedColumn,
	Entity,
	BaseEntity,
	CreateDateColumn,
	ManyToMany,
	ManyToOne,
	JoinColumn,
	JoinTable,
} from "typeorm";
import { Album } from "./Album";
import { Artist } from "./Artist";
import { Genre } from "./Genre";
import { Playlist } from "./Playlist";

@Entity("tracks")
export class Track extends BaseEntity {
	@PrimaryGeneratedColumn()
	idTrack: number;

	@Column("varchar", { length: 25 })
	titleTrack: string;

	@Column("int")
	duration: number;

	@Column("varchar", { length: 25, nullable: true })
	pathTrack: string;

	@Column("varchar", { length: 25, nullable: true })
	coverTrack: string;

	@Column("smallint")
	releaseDate: number;

	@CreateDateColumn()
	createdAt: Date;

	@ManyToOne(() => Genre, (genre) => genre.tracks)
	@JoinColumn({ name: "idGenre" })
	idGenre: Genre;

	@ManyToOne(() => Album, (album) => album.tracks)
	@JoinColumn({ name: "idAlbum" })
	idAlbum: Album;

	@ManyToOne(() => Artist, (artist) => artist.tracks)
	@JoinColumn({ name: "idPrimaryArtist" })
	idPrimaryArtist: Artist;

	@ManyToMany(() => Playlist, (playlist) => playlist.tracks)
	playlists: Playlist[];

	@ManyToMany(() => Artist, (artist) => artist.featuringArtists)
	@JoinTable({
		name: "track_featured_artists",
		joinColumn: {
			name: "idTrack",
			referencedColumnName: "idTrack",
		},
		inverseJoinColumn: {
			name: "idFeaturedArtist",
			referencedColumnName: "idArtist",
		},
	})
	artists: Artist[];
}
