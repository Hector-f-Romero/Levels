import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, CreateDateColumn } from "typeorm";

@Entity("playlists")
export class Playlist extends BaseEntity {
	@PrimaryGeneratedColumn()
	idPlaylist: number;

	@Column("varchar", { length: 25 })
	namePlaylist: string;

	@CreateDateColumn()
	createdAt: Date;
}
