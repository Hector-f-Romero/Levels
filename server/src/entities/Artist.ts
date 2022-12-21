import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Album } from "./Album";
import { Track } from "./Track";

export enum ArtistType {
	ARTIST = "Artist",
	GROUP = "Group",
}

@Entity("artists")
export class Artist extends BaseEntity {
	@PrimaryGeneratedColumn()
	idArtist: number;

	@Column("varchar", { length: 25, nullable: true })
	namesArtist: string;

	@Column("varchar", { length: 25, nullable: true })
	lastNamesArtist: string;

	@Column("varchar", { length: 25 })
	stageName: string;

	@Column({ type: "enum", enum: ArtistType, default: ArtistType.ARTIST })
	typeArtist: ArtistType;

	@Column("date")
	bornDate: Date;

	@Column("varchar", { length: 25 })
	countryOrigin: string;

	@Column("varchar", { length: 25, nullable: true })
	artistPhoto: string;

	@OneToMany(() => Track, (track) => track.idPrimaryArtist)
	tracks: Track[];

	@ManyToMany(() => Track, (ftArtist) => ftArtist.artists)
	featuringArtists: Track[];

	@ManyToMany(() => Album, (album) => album.artists, { onDelete: "CASCADE" })
	@JoinTable({
		name: "artist_albums",
		joinColumn: {
			name: "idArtist",
			referencedColumnName: "idArtist",
		},
		inverseJoinColumn: {
			name: "idAlbum",
			referencedColumnName: "idAlbum",
		},
	})
	albums: Album[];
}
