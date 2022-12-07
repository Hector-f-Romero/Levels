import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, CreateDateColumn, OneToMany } from "typeorm";
import { Playlists_Users } from "./Playlist_Users.entity";

@Entity("playlists")
export class Playlist extends BaseEntity {
	@PrimaryGeneratedColumn()
	idPlaylist: number;

	@Column("varchar", { length: 25 })
	namePlaylist: string;

	@CreateDateColumn()
	createdAt: Date;

	@OneToMany(() => Playlists_Users, (playlistUser) => playlistUser.playlist)
	playlistUser: Playlists_Users;
}
