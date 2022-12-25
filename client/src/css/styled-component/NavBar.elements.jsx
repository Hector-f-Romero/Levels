import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Menu = styled.ul`
	list-style-type: none;
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	flex-direction: column;
	position: absolute;
	top: 80px;
	left: ${({ pressed }) => (pressed ? 0 : "-100%")};
	transition: 0.35s all ease-in;
	background-color: #282828;

	@media screen and (min-width: 768px) {
		width: auto;
		height: 100%;
		position: inherit;
		flex-direction: row;
	}
`;

export const MenuItem = styled.li`
	text-decoration: none;
	color: inherit;
	margin: 2em 0;
	cursor: pointer;
`;

export const MenuItemLink = styled(NavLink)`
	text-decoration: none;
	color: #efefef;
	cursor: pointer;
	margin: 0 1em;
	@media screen and (min-width: 768px) {
	}
`;
