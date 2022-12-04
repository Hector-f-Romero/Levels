import { Column, PrimaryGeneratedColumn, Entity, BaseEntity } from "typeorm";

@Entity("albums")
export class Album extends BaseEntity {
	@PrimaryGeneratedColumn()
	idAlbum: number;

	@Column("varchar", { length: 25 })
	titleAlbum: string;

	@Column("smallint")
	releaseDate: number;

	@Column("varchar", { length: 25 })
	label: string;

	@Column("varchar", { length: 25, nullable: true })
	coverAlbum: string;
}
