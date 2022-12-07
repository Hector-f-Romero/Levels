import { DataSource } from "typeorm";
import { User } from "../entities/User.entity";
import { Album } from "../entities/Album.entity";
import { Genre } from "../entities/Genre.entity";
import { Playlist } from "../entities/Playlist.entity";
import { Playlists_Users } from "../entities/Playlist_Users.entity";

const AppDataSource = new DataSource({
	type: "mysql",
	host: <string>process.env.HOST_DB,
	port: 3306,
	username: <string>process.env.USER_DB,
	password: <string>process.env.PASSWORD_DB,
	database: <string>process.env.DB,
	logging: true,
	entities: [User, Album, Genre, Playlist, Playlists_Users],
});

const connectDB = async () => {
	try {
		await AppDataSource.initialize();
		console.log("Conexión a la base de datos MySQL existosa.");
	} catch (error) {
		console.log(error);
	}
};

export { connectDB };
