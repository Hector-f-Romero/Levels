import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/userContext";

const Account = () => {
	const { userData, setUserData } = useContext(UserContext);

	const navigate = useNavigate();

	const logOut = () => {
		setUserData({ idUser: "", names: "", lastNames: "", userName: "", email: "", password: "", userType: "" });
		navigate("/login");
	};

	return (
		<>
			<div className="account-container">
				<h1>Account overview</h1>
				<h2>Profile</h2>
				<table className="profile-table">
					<tbody>
						<tr>
							<td>ID user</td>
							<td>{userData.idUser}</td>
						</tr>
						<tr>
							<td>Names</td>
							<td>{userData.names}</td>
						</tr>
						<tr>
							<td>Lastnames</td>
							<td>{userData.lastNames}</td>
						</tr>
						<tr>
							<td>UserName</td>
							<td>{userData.userName}</td>
						</tr>
						<tr>
							<td>Email</td>
							<td>{userData.email}</td>
						</tr>
						<tr>
							<td>User type</td>
							<td>{userData.userType}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="center-container">
				<button className="btn" onClick={logOut}>
					Log Out
				</button>
			</div>
		</>
	);
};

export default Account;
