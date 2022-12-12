import { DataSource } from "typeorm";
import "dotenv/config";

import { User } from "../entities/User";
import { Album } from "../entities/Album";
import { Genre } from "../entities/Genre";
import { Playlist } from "../entities/Playlist";
import { Track } from "../entities/Track";
import { Artist } from "../entities/Artist";

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
	migrations: [__dirname + "/migrations/*{.ts,.js}"],
	migrationsRun: true,
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
