import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, CreateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Track } from "./Track";
import { User } from "./User";

@Entity("playlists")
export class Playlist extends BaseEntity {
	@PrimaryGeneratedColumn()
	idPlaylist: number;

	@Column("varchar", { length: 25 })
	namePlaylist: string;

	@CreateDateColumn()
	createdAt: Date;

	@ManyToMany(() => User, (user) => user.playlists)
	@JoinTable({
		name: "playlist_users",
		joinColumn: {
			name: "idPlaylist",
			referencedColumnName: "idPlaylist",
		},
		inverseJoinColumn: {
			name: "idUser",
			referencedColumnName: "idUser",
		},
	})
	users: User[];

	@ManyToMany(() => Track, (track) => track.playlists)
	@JoinTable({
		name: "playlist_tracks",
		joinColumn: {
			name: "idPlaylist",
			referencedColumnName: "idPlaylist",
		},
		inverseJoinColumn: {
			name: "idTrack",
			referencedColumnName: "idTrack",
		},
	})
	tracks: Track[];
}
