const getLastTracks = (req, res) => {
    res.status(200).json({ msg: "Últimas 10 canciones" });
};
export { getLastTracks };
