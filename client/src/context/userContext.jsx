import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [userData, setUserData] = useState({
		idUser: "",
		names: "",
		lastNames: "",
		userName: "",
		email: "",
		password: "",
		userType: "",
	});
	const [loadingUserData, setLoadingUserData] = useState(false);

	return (
		<UserContext.Provider value={{ userData, setUserData, loadingUserData, setLoadingUserData }}>
			{children}
		</UserContext.Provider>
	);
};
