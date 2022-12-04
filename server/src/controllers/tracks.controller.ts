import { Request, Response } from "express";

const getLastTracks = (req: Request, res: Response) => {
	res.status(200).json({ msg: "Últimas 10 canciones" });
};

export { getLastTracks };
