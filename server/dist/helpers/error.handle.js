const handleHttp = (res, error) => {
    res.status(500).json({ error });
};
export { handleHttp };
