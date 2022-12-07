import { Entity, BaseEntity, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Playlist } from "./Playlist.entity";
import { User } from "./User.entity";

@Entity("playlists_users")
export class Playlists_Users extends BaseEntity {
	@PrimaryColumn()
	idPlaylist: number;

	@PrimaryColumn()
	idUser: number;

	@ManyToOne(() => Playlist, (playlist) => playlist.playlistUser)
	@JoinColumn({ name: "idPlaylist" })
	playlist: Playlist;

	@ManyToOne(() => User, (user) => user.playlistUser)
	@JoinColumn({ name: "idUser" })
	user: User;
}
