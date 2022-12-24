import React, { useState, useContext } from "react";

import "../css/navbar.css";
import { Menu, MenuItem, MenuItemLink } from "../css/styled-component/NavBar.elements";
import { FiMenu, FiX } from "react-icons/fi";
import { UserContext } from "../context/userContext";

const NavBar = () => {
	const [hamburguerMenu, setHamburgerMenu] = useState(false);

	const { userData } = useContext(UserContext);

	const handleHamburguerMenu = () => {
		setHamburgerMenu(!hamburguerMenu);
	};

	return (
		<header>
			<nav className="main-nav">
				<MenuItemLink to="/">Levels</MenuItemLink>
				<Menu pressed={hamburguerMenu}>
					<MenuItem>
						<MenuItemLink to="/" onClick={handleHamburguerMenu}>
							Inicio
						</MenuItemLink>
					</MenuItem>
					{userData.userType === "Admin" && <MenuItem>Admin</MenuItem>}

					<MenuItem>
						<MenuItemLink to="/login" onClick={handleHamburguerMenu}>
							Playlists
						</MenuItemLink>
					</MenuItem>
					<MenuItem>
						<MenuItemLink to="/albums" onClick={handleHamburguerMenu}>
							Albums
						</MenuItemLink>
					</MenuItem>
					<MenuItem>
						<MenuItemLink to="/create/album" onClick={handleHamburguerMenu}>
							Cuenta
						</MenuItemLink>
					</MenuItem>
				</Menu>
				<div className="toggle-menu" onClick={handleHamburguerMenu}>
					{hamburguerMenu ? <FiX /> : <FiMenu />}
				</div>
			</nav>
		</header>
	);
};
export default NavBar;
