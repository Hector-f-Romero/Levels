import { NextFunction, Request, Response } from "express";

const fileExists = (req: Request, res: Response, next: NextFunction) => {
	if (!req.file) {
		return res.status(404).json({ msg: `Don't exists file or files into request.` });
	}
	next();
};

export { fileExists };
