import { DataSource } from "typeorm";
import "dotenv/config";

import { Album, Artist, Genre, Playlist, Track, User } from "../entities/index.entity";

const AppDataSource = new DataSource({
	type: "mysql",
	host: <string>process.env.HOST_DB,
	port: 3306,
	username: <string>process.env.USER_DB,
	password: <string>process.env.PASSWORD_DB,
	database: <string>process.env.DB,
	synchronize: true,
	logging: true,
	entities: [User, Album, Genre, Playlist, Track, Artist],
	migrations: ["../migrations/*{.ts,.js}"],
});

const connectDB = async () => {
	try {
		await AppDataSource.initialize();
		console.log("Conexión a la base de datos MySQL existosa.");
	} catch (error) {
		console.log(error);
	}
};

export { connectDB, AppDataSource };
