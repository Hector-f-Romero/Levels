import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, OneToMany } from "typeorm";
import { Track } from "./Track";

@Entity("genres")
export class Genre extends BaseEntity {
	@PrimaryGeneratedColumn()
	idGenre: number;

	@Column("varchar", { length: 15 })
	nameGenre: string;

	@OneToMany(() => Track, (track) => track.idGenre)
	tracks: Track[];
}
