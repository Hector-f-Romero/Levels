import { AppDataSource } from "../config/mysql";
import { Album } from "../entities/";

const albumRepository = AppDataSource.getRepository(Album);

const albumIdExist = async (id: number): Promise<void> => {
	const idExist = await albumRepository.findOneBy({ idAlbum: id });
	if (!idExist) {
		throw new Error(`Id ${id} don't exists in BD.`);
	}
};

export { albumIdExist };
