import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
	const [data, setData] = useState([]);
	const [track, setTrack] = useState({});
	const [loadingData, setLoadingData] = useState(false);

	return (
		<DataContext.Provider value={{ data, setData, loadingData, setLoadingData, track, setTrack }}>
			{children}
		</DataContext.Provider>
	);
};
