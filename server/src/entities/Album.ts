import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, OneToMany, ManyToMany } from "typeorm";
import { Artist } from "./Artist";
import { Track } from "./Track";

@Entity("albums")
export class Album extends BaseEntity {
	@PrimaryGeneratedColumn()
	idAlbum: number;

	@Column("varchar", { length: 50 })
	titleAlbum: string;

	@Column("smallint")
	releaseDate: number;

	@Column("varchar", { length: 25 })
	label: string;

	@Column("varchar", { length: 25, nullable: true })
	albumCover: string;

	@OneToMany(() => Track, (track) => track.idAlbum)
	tracks: Track[];

	@ManyToMany(() => Artist, (artist) => artist.albums, { onDelete: "CASCADE" })
	artists: Artist[];
}
