import React from "react";
import "./css/register.css";
import { FormControl, FormControlLabel, Checkbox } from "@mui/material";
import TextField from "@material-ui/core/TextField";
import { Button } from "@mui/material";

const RegisterPage = () => {
	return (
		<div>
			<div className="main">
				<div className="form">
					<div className="button-links">
						<div>
							<h3
								className="title"
								style={{
									paddingLeft: "10px",
								}}
							>
								Register your account with
							</h3>{" "}
							<br />
							<Button
								endIcon={<i className="fab fa-google"></i>}
								variant="outlined"
								color="primary"
							/>
							<Button
								variant="outlined"
								color="primary"
								endIcon={<i className="fab fa-facebook"></i>}
							/>
							<Button
								variant="outlined"
								color="primary"
								endIcon={<i className="fab fa-apple"></i>}
							/>
							<h3
								className="title"
								style={{
									paddingLeft: "115px",
								}}
							>
								or
							</h3>{" "}
							<br />
						</div>
					</div>
					<div>
						<FormControl
							fullWidth
							className="form-contain"
						>
							<TextField
								required
								id="email"
								label="Enter your Email"
								variant="outlined"
								className="form-field"
								margin="normal"
							/>
							<TextField
								required
								id="password"
								label="Enter your Password"
								variant="outlined"
								type="password"
								className="form-field"
								margin="normal"
							/>
							<TextField
								required
								id="confirm-password"
								label="Re-enter your Password"
								variant="outlined"
								type="password"
								className="form-field"
								margin="normal"
							/>
							<TextField
								id="contact-number"
								label="Enter your Contact Number"
								variant="outlined"
								className="form-field"
								margin="normal"
							/>
							<FormControlLabel
								required
								control={<Checkbox />}
								label="I agree to all terms and conditons"
								style={{
									marginTop: "10px",
									marginBottom: "20px",
									fontWeight: "bold",
								}}
							/>
							<Button variant="contained">Regsiter</Button>
							<h3
								style={{
									paddingLeft: "20px",
								}}
							>
								Already have a account? <a href="">Sign up</a>
							</h3>
						</FormControl>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
