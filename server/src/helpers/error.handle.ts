import { Response } from "express";

const handleHttp = (res: Response, error: unknown, myMsg: string) => {
	// console.log(error);
	return res.status(500).json({ myMsg, error });
};

export { handleHttp };
