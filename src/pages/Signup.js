import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper/index";

const Signup = () => {
	//Initial States for the Signup component
	const initialValues = {
        firstname: "",
        lastname: "",
		email: "",
		password: "",
		error: "",
		success: false,
	};

	//States for Signup component
	const [values, setValues] = useState(initialValues);

	//Destructuring the states of the Signup component
	const { firstname,lastname, email, password, error, success } = values;

	//Sets data in the states according to the input fields
	const handleChange = (inputValue) => (event) => {
		setValues({
			...values,
			error: false,
			success: false,
			[inputValue]: event.target.value,
		});
	};

	//Submits the signup form and gets the response data from the backend
	const formSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false });
		signup({ firstname,lastname, email, password })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, success: false });
				} else {
					setValues({ ...initialValues, success: true });
				}
			})
			.catch((err) =>
				console.log("Error: Signup request to the server failed!\n", err)
			);
		//This catch runs whenever there is an error at the backend which is not handled
	};

	//Signup success message popup
	const successMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-center">
					<div
						className="alert alert-success"
						style={{ display: success ? "" : "none" }}
					>
						New account was created successfully. Please{" "}
						<Link to="/signin">Login here</Link>
					</div>
				</div>
			</div>
		);
	};

	//Signup error message popup
	const errorMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-center">
					<div
						className="alert alert-danger"
						style={{ display: error ? "" : "none" }}
					>
						{error}
					</div>
				</div>
			</div>
		);
	};

	//Signup form component
	const signUpForm = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<form>
						<div className="form-group">
							<label className=".text-dark">First Name</label>
							<input
								type="text"
								className="form-control"
								onChange={handleChange("firstname")}
								value={firstname}
							/>
						</div>
                        <div className="form-group">
							<label className=".text-dark">Last Name</label>
							<input
								type="text"
								className="form-control"
								onChange={handleChange("lastname")}
								value={lastname}
							/>
						</div>
						<div className="form-group">
							<label className=".text-dark">Email</label>
							<input
								type="email"
								className="form-control"
								onChange={handleChange("email")}
								value={email}
							/>
						</div>
						<div className="form-group">
							<label className=".text-dark">Password</label>
							<input
								type="password"
								className="form-control"
								onChange={handleChange("password")}
								value={password}
							/>
						</div>
						<button className="btn btn-success btn-block" onClick={formSubmit}>
							Submit
						</button>
					</form>
				</div>
			</div>
		);
	};

	return (
		<div>
			
				{successMessage()}
				{errorMessage()}
				{signUpForm()}

		</div>
	);
};

export default Signup;