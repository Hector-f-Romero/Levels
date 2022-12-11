import React from "react";
import { useState } from "react";
import FormInput from "../components/FormInput";
import "../css/form.css";

const LogIn = () => {
	const [values, setValues] = useState({
		userName: "",
		password: "",
	});

	const inputs = [
		{
			id: 1,
			name: "userName",
			type: "text",
			placeholder: "UserName",
			label: "User Name",
		},
		{
			id: 2,
			name: "password",
			type: "password",
			placeholder: "Password",
			label: "Password",
		},
	];

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Enviando información");
		console.log(values);
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
					<button>Submit</button>
				</form>
			</div>
		</>
	);
};

export default LogIn;
