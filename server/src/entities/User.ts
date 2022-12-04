import { Column, PrimaryGeneratedColumn, Entity, BaseEntity } from "typeorm";

export enum UserType {
	ADMIN = "Admin",
	USER = "User",
}

@Entity("users")
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	// @PrimaryGeneratedColumn("uuid")
	idUser: number;

	@Column("varchar", { length: 25 })
	names: string;

	@Column("varchar", { length: 25 })
	lastNames: string;

	@Column("varchar", { length: 20 })
	userName: string;

	@Column("varchar", { length: 30 })
	email: string;

	@Column("varchar", { length: 15 })
	password: string;

	@Column({ type: "enum", enum: UserType, default: UserType.USER })
	userType: UserType;
}
