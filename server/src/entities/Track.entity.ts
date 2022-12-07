import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, CreateDateColumn, ManyToOne } from "typeorm";

@Entity("tracks")
export class Track extends BaseEntity {
	@PrimaryGeneratedColumn()
	idTrack: number;

	@Column("varchar", { length: 25 })
	titleTrack: string;

	@Column("int")
	duration: number;

	// @ManyToOne(()=>)
	// @Column("int")
	// idGenre: number;

	@Column("int")
	idAlbum: number;

	@Column("varchar", { length: 25, nullable: true })
	pathTrack: string;

	@Column("varchar", { length: 25, nullable: true })
	coverTrack: string;

	@Column("smallint")
	releaseDate: number;

	@CreateDateColumn()
	createdAt: Date;
}
