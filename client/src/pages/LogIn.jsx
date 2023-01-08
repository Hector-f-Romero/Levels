import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { UserContext } from "../context/userContext";
import { loginUserRequest } from "../api/user.api";
import FormInput from "../components/FormInput";
import "../css/form.css";

const LogIn = () => {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		resetField,
		formState: { errors },
	} = useForm({});
	const { setUserData, setLoadingUserData } = useContext(UserContext);
	const navigate = useNavigate();

	const inputs = [
		{
			id: 1,
			name: "userName",
			label: "User Name",
			type: "text",
			placeholder: "UserName",
			validationProps: {
				required: "Username cannot be empty.",
				maxLength: {
					value: 20,
					message: "Names should be  at most 20 chars long.",
				},
			},
		},
		{
			id: 2,
			name: "password",
			label: "Password",
			type: "password",
			placeholder: "Password",
			validationProps: {
				required: "Password cannot be empty.",
				maxLength: {
					value: 15,
					message: "Names should be  at most 15 chars long.",
				},
			},
		},
	];

	const onSubmit = async (data) => {
		console.log(data);
		setLoadingUserData(true);
		const res = await loginUserRequest(data);
		setLoadingUserData(false);

		// UserName don't exist.
		if (res.status === 404) {
			alert("userName don't exist.");
		}

		// Incorrect password.
		if (res.status === 401) {
			alert("Incorrect password.");
		}

		if (res.status === 200) {
			const { jwt, user } = res.data;
			setUserData(user);
			localStorage.setItem("auth", jwt);
			navigate("/");
			console.log(localStorage.getItem("auth"));
			reset();
		}
	};

	return (
		<>
			<div className="form-container">
				<h1>Sign in</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					{inputs.map((input) => (
						<FormInput key={input.id} register={register} settings={input} errors={errors} watch={watch} />
					))}
					<div className="center-container">
						<input type="submit" value={"Submit"} className="btn-submit" />
					</div>
				</form>
			</div>
		</>
	);
};

export default LogIn;
