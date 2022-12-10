import React from "react";
import { NavLink } from "react-router-dom";
import Home from "../pages/Home";

const NavBar = () => {
	return (
		<header>
			<h1>Levels</h1>
			<NavLink to="/">Inicio</NavLink>
		</header>
	);
};

export default NavBar;
