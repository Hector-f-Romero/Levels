import React, { useState } from "react";

import { Menu, MenuItem, MenuItemLink } from "../css/NavBar.elements";
import { FiMenu, FiX } from "react-icons/fi";

const NavBar = () => {
	const [hamburguerMenu, setHamburgerMenu] = useState(false);

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
						<MenuItemLink to="/login" onClick={handleHamburguerMenu}>
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
