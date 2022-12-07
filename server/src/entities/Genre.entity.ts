import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, OneToMany } from "typeorm";
import { Track } from "./Track.entity";

@Entity("genres")
export class Genre extends BaseEntity {
	@PrimaryGeneratedColumn()
	// @OneToMany(() => Track, (genre) => genre.idGenre, {
	// 	cascade: true,
	// })
	idGenre: Track;

	@Column("varchar", { length: 15 })
	nameGenre: string;
}
