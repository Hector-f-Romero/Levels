import { NextFunction, Request, Response } from "express";

const albumExistsMiddleware = async (idAlbum) => {
	return (req: Request, res: Response, next: NextFunction) => {
		let entity: unknown;

		if (!entity) {
			return res.status(404).json({ msg: `Don't exists id ${req.params.id} in ${req.params.folder} ` });
		}
		// Save the data of entity
		res.locals.entity = entity;
		next();
	};
};
