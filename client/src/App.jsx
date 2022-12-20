import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import Albums from "./pages/Albums";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import NotFound from "./pages/NotFound";
import { DataProvider } from "./context/dataContext";

const App = () => {
	return (
		<DataProvider>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/albums" element={<Albums />} />
					<Route path="/login" element={<LogIn />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</DataProvider>
	);
};

export default App;
