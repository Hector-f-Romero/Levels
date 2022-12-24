import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [userData, setUserData] = useState({
		userName: "Test1",
		userType: "User",
	});
	const [loadingUserData, setLoadingUserData] = useState(false);

	return (
		<UserContext.Provider value={{ userData, setUserData, loadingUserData, setLoadingUserData }}>
			{children}
		</UserContext.Provider>
	);
};
