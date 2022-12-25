import React from "react";
import { Link } from "react-router-dom";

const AdminManager = () => {
	return (
		<>
			<h1>Administrator Manager</h1>

			<button>Albums</button>
			<button>Artists</button>
			<button>Genres</button>
			<button>Users</button>
			<button>Tracks</button>
			<Link to="/create/artist">Create artist</Link>
		</>
	);
};

export default AdminManager;
