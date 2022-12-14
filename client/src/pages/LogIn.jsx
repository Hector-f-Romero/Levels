import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUserRequest } from "../api/user.api";
import FormInput from "../components/FormInput";
import "../css/form.css";

const LogIn = () => {
	const [values, setValues] = useState({
		userName: "",
		password: "",
	});
	const [errors, setErrors] = useState([]);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const inputs = [
		{
			id: 1,
			name: "userName",
			label: "User Name",
			placeholder: "UserName",
			type: "text",
			maxLength: 20,
			minLength: 3,
			maxlenght: "15",
			errorMessage: "UserName cannot be empty.",
			required: true,
		},
		{
			id: 2,
			name: "password",
			label: "Password",
			placeholder: "Password",
			type: "password",
			maxLength: 15,
			minLength: 3,
			errorMessage: "Password cannot be empty.",
			required: true,
		},
	];

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const res = await loginUserRequest(values);
		setLoading(false);

		// UserName don't exist.
		if (res.status === 404) {
			setErrors([]);
			setErrors((errors) => [...errors, res.data]);
		}

		// Incorrect password.
		if (res.status === 401) {
			setErrors([]);
			setErrors((errors) => [...errors, res.data]);
		}

		if (res.status === 200) {
			console.log(res);
			console.log("Usuario existe en la BD");
			navigate("/");
		}
	};

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	return (
		<>
			<h1>Log IN</h1>
			<div className="">
				<form className="form-container" onSubmit={handleSubmit}>
					{inputs.map((input) => (
						<FormInput key={input.id} {...input} values={values[input.name]} onChange={onChange} />
					))}
					{errors !== null ? errors.map((e, index) => <p key={index}>{e.msg}</p>) : null}
					<button className="btn-submit">Submit</button>
				</form>
			</div>
		</>
	);
};

export default LogIn;
