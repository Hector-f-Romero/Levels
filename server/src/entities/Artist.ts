import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, OneToMany, ManyToMany } from "typeorm";
import { Track } from "./Track";

export enum ArtistType {
	ARTIST = "Artist",
	GROUP = "Group",
}

@Entity("artists")
export class Artist extends BaseEntity {
	@PrimaryGeneratedColumn()
	idArtist: number;

	@Column("varchar", { length: 25 })
	namesArtist: string;

	@Column("varchar", { length: 25 })
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

	@ManyToMany(() => Artist, (ftArtist) => ftArtist.tracks)
	featuringArtists: Artist[];
}
