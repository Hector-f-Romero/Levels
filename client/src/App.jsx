import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { UserProvider } from "./context/userContext";
import { DataProvider } from "./context/dataContext";

import NavBar from "./components/NavBar";
import Albums from "./pages/Albums";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

import CreateAlbum from "./pages/admin/CreateAlbum";
import CreateArtist from "./pages/admin/CreateArtist";

const App = () => {
	return (
		<UserProvider>
			<DataProvider>
				<BrowserRouter>
					<NavBar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/albums" element={<Albums />} />
						<Route path="/login" element={<LogIn />} />
						<Route path="/create/album" element={<CreateAlbum />} />
						<Route path="/create/artist" element={<CreateArtist />} />
						<Route path="/account" element={<Account />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</DataProvider>
		</UserProvider>
	);
};

export default App;
