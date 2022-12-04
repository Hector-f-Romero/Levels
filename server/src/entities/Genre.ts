import { Column, PrimaryGeneratedColumn, Entity, BaseEntity } from "typeorm";

@Entity("genres")
export class Genre extends BaseEntity {
	@PrimaryGeneratedColumn()
	idGenre: number;

	@Column("varchar", { length: 15 })
	nameGenre: string;
}
