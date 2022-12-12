import { Column, Entity, BaseEntity, ManyToMany, PrimaryColumn } from "typeorm";

import { Playlist } from "./Playlist";

export enum UserType {
	ADMIN = "Admin",
	USER = "User",
}

@Entity("users")
export class User extends BaseEntity {
	@PrimaryColumn()
	idUser: string;

	@Column("varchar", { length: 25 })
	names: string;

	@Column("varchar", { length: 25 })
	lastNames: string;

	@Column({ type: "varchar", length: 20, collation: "utf8mb4_bin" })
	userName: string;

	@Column("varchar", { length: 50 })
	email: string;

	@Column("varchar", { length: 15 })
	password: string;

	@Column({ type: "enum", enum: UserType, default: UserType.USER })
	userType: UserType;

	@ManyToMany(() => Playlist, (playlist) => playlist.users)
	playlists: Playlist[];
}
