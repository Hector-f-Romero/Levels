import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Album } from "../entities/Album";
import { Genre } from "../entities/Genre";
import { Playlist } from "../entities/Playlist";

const AppDataSource = new DataSource({
	type: "mysql",
	host: <string>process.env.HOST_DB,
	port: 3306,
	username: <string>process.env.USER_DB,
	password: <string>process.env.PASSWORD_DB,
	database: <string>process.env.DB,
	logging: true,
	entities: [User, Album, Genre, Playlist],
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
