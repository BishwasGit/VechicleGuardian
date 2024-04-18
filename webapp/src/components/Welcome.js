import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import "./css/welcome.css";
import axios from "axios";
import {
	TextField,
	FormControl,
	FormControlLabel,
	Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import FacebookIcon from "@mui/icons-material/Facebook";

import background3 from "../assets/images/bg7.jpg";
import background2 from "../assets/images/bg4.jpg";

const Welcome = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [dialogVisible, setDialogVisible] = useState(false);
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [userTypes, setUserTypes] = useState({
		customer: false,
		repairCenter: false,
		repairPartsSeller: false,
	});
	const [loginActive, setLoginActive] = useState(true);

	const [registrationStatus, setRegistrationStatus] = useState(null);
	const [alertMessage, setAlertMessage] = useState(null);

	const handleLogin = async () => {
		setLoading(true);
		try {
			const response = await axios.post(
				`http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/api/login`,
				{ username, password },
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const data = response.data;
			console.log("data after login success", data);
			if (response.status === 200) {
				localStorage.setItem("userToken", data.token);
				localStorage.setItem("userId", data.userId);
				localStorage.setItem("userType", data.userType);
				if (
					(data.userType === "customer") | (data.userType === "repaircenter") ||
					data.userType === "repaircenter_workers"
				) {
					// Navigate based on userType
					setTimeout(() => {
						navigate(
							data.userType === "customer"
								? `/customerDashboard/${data.userId}`
								: data.userType === "repaircenter"
								? `/repairCenterDashboard/${data.userId}`
								: `/workerDashboard/${data.userId}`,
							{ [`${data.userType}_id`]: data.userId }
						);
					}, 1000);
				} else if (data.userType === "admin") {
					// Navigate to AdminDashboard
					setDialogVisible(true);
					setTimeout(() => {
						setDialogVisible(false);
						navigate(`/adminDashboard/${data.userId}`, {
							admin_id: data.userId,
						});
					}, 1000);
				} else if (data.userType === "seller") {
					setTimeout(() => {
						setDialogVisible(false);
						const userId = data.userId;
						const redirectUrl = `http://127.0.0.1:8000/dashboard/${userId}`;
						window.location.href = redirectUrl;
					}, 1000);
				}
			} else {
				setMessage(data.error);
			}
		} catch (error) {
			console.error("Error during login:", error);
			setMessage("Login failed. Please try again.");
		} finally {
			setLoading(false);
		}
	};
	const [currentImage, setCurrentImage] = useState(0);
	const images = [background3, background2];

	const goToImage = index => {
		setCurrentImage(index);
	};

	const [showRegisterCard, setShowRegisterCard] = useState(false);
	const [showLoginCard, setShowLoginCard] = useState(true);

	// Function to handle clicking the register button
	const handleRegisterClick = () => {
		setShowRegisterCard(true);
		setShowLoginCard(false);
		setLoginActive(false);
	};

	// Function to handle clicking the login button
	const handleLoginClick = () => {
		setShowRegisterCard(false);
		setShowLoginCard(true);
		setLoginActive(true);
	};

	const handleRegistration = async () => {
		const formData = {
			userTypes,
			username,
			phone,
			email,
			password,
		};
		console.log(formData);
		try {
			const response = await axios.post(
				`http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/api/register`,
				{
					userTypes,
					username,
					phone,
					email,
					password,
				}
			);

			console.log(response.data);
			setRegistrationStatus(`Registered as ${userTypes.join(", ")}`);
			setAlertMessage(
				`Registered as ${Object.keys(userTypes)
					.filter(type => userTypes[type])
					.join(", ")}`
			);
		} catch (error) {
			console.error("Error registering:", error);
			console.error("Error registering:", error.response.data.error);
			setRegistrationStatus(
				`Registration failed: ${error.response.data.error}`
			);
			setAlertMessage(
				`Registered as ${Object.keys(userTypes)
					.filter(type => userTypes[type])
					.join(", ")}`
			);
		}
	};

	const handleUserTypeChange = type => {
		setUserTypes({ ...userTypes, [type]: !userTypes[type] });
	};

	return (
		<div
			className="container"
			maxWidth="lg"
		>
			<Grid
				container
				justifyContent="center"
				alignItems="center"
			>
				<Grid
					item
					lg={6}
					sm={12}
					style={{
						position: "relative",
						overflow: "hidden",
					}}
				>
					<div
						className="left-content"
						style={{ zIndex: 1 }}
					>
						{" "}
						{/* Adjusted z-index */}
						<div className="carousel">
							<div className="image-container">
								<img
									className="image-contain"
									src={images[currentImage]}
									alt={`${currentImage + 1}`}
								/>
								<div className="buttons">
									{images.map((_, index) => (
										<button
											id="button"
											key={index}
											className={index === currentImage ? "active" : ""}
											onClick={() => goToImage(index)}
										></button>
									))}
								</div>
							</div>
						</div>
						<div
							className="overlay"
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								height: "100%",
								backgroundColor: "rgba(18, 0, 128, 0.3)",
								backdropFilter: "blur(8px)",
							}}
						></div>
						<div className="text">
							<h1>Vehicle Guardian</h1>
							<h3>
								This app is a comprehensive solution bridging the gap
								<br />
								between vehicle owners and repair centers, streamlining the
								entire repair and maintenance process
							</h3>
						</div>
					</div>
				</Grid>

				<Grid
					item
					lg={6}
					sm={12}
				>
					<Card className="new-card">
						<div className="right-content">
							<CardContent className="card">
								<div className="button-carousel">
									<button
										className={`mainButton ${loginActive ? "active" : ""}`}
										variant="contained"
										fullWidth
										onClick={handleLoginClick}
									>
										<a style={{ color: "black", fontWeight: "bold" }}>Login</a>
									</button>

									<button
										className={`mainButton ${!loginActive ? "active" : ""}`}
										variant="contained"
										fullWidth
										onClick={handleRegisterClick}
									>
										<a style={{ color: "black", fontWeight: "bold" }}>
											Register
										</a>
									</button>
								</div>

								{showLoginCard && (
									<FormControl
										fullWidth
										className="form"
									>
										<p>
											<span style={{ fontSize: 30, fontWeight: "bold" }}>
												Welcome Back !!!
											</span>
										</p>
										<TextField
											required
											id="username"
											label="Enter your Username"
											variant="standard"
											className="form-field"
											margin="normal"
											value={username}
											onChange={e => setUsername(e.target.value)}
											InputLabelProps={{ style: { color: "#dcdcdc" } }} // Adjust the color as needed
										/>

										<TextField
											required
											id="password"
											label="Enter your Password"
											variant="standard"
											type="password"
											className="form-field"
											margin="normal"
											value={password}
											onChange={e => setPassword(e.target.value)}
											InputLabelProps={{ style: { color: "#dcdcdc" } }}
										/>
										<FormControlLabel
											control={<Checkbox />}
											label="Remember Me"
											style={{
												marginTop: "10px",
												marginBottom: "20px",
												fontWeight: "bold",
											}}
										/>
										<Button
											className="submit"
											variant="contained"
											onClick={handleLogin}
											disabled={loading}
										>
											{loading ? "Loading..." : "Login"}
										</Button>
										<h4>or you can sign up with</h4>
										<div className="iconDiv">
											<Button
												variant="contained"
												onClick={handleLogin}
												className="submitAnother"
												sx={{
													"& .MuiButton-startIcon": {
														minWidth: 0,
														marginRight: "-5px",
														fontSize: "50px", // Adjust the size as needed
													},
												}}
												startIcon={<FacebookIcon sx={{ fontSize: "50px" }} />}
											></Button>

											<Button
												variant="contained"
												onClick={handleLogin}
												className="submitAnother"
												sx={{
													"& .MuiButton-startIcon": {
														minWidth: 0,
														marginRight: "-5px",
														fontSize: "50px", // Adjust the size as needed
													},
												}}
												startIcon={<GoogleIcon sx={{ fontSize: "50px" }} />}
											></Button>
											<Button
												variant="contained"
												onClick={handleLogin}
												className="submitAnother"
												sx={{
													"& .MuiButton-startIcon": {
														minWidth: 0,
														marginRight: "-5px",
														fontSize: "50px", // Adjust the size as needed
													},
												}}
												startIcon={<AppleIcon sx={{ fontSize: "50px" }} />}
											></Button>
										</div>
										<h4
											style={{
												paddingLeft: "20px",
											}}
										>
											Don't have a account?{" "}
											<a href="/register">Register Here</a>
										</h4>

										{message && <p>{message}</p>}
										{dialogVisible && <CircularProgress />}
									</FormControl>
								)}
								{showRegisterCard && (
									<FormControl
										fullWidth
										className="form"
									>
										<p>
											<span style={{ fontSize: 30, fontWeight: "bold" }}>
												Register !!!
											</span>
										</p>
										<TextField
											required
											id="username"
											label="Username"
											variant="standard"
											className="form-field"
											margin="normal"
											value={username}
											onChange={e => setUsername(e.target.value)}
											InputLabelProps={{ style: { color: "#dcdcdc" } }}
										/>
										<TextField
											required
											id="phone"
											label="Phone Number"
											variant="standard"
											className="form-field"
											margin="normal"
											value={phone}
											onChange={e => setPhone(e.target.value)}
											InputLabelProps={{ style: { color: "#dcdcdc" } }}
										/>
										<TextField
											required
											id="email"
											label="Email"
											variant="standard"
											className="form-field"
											margin="normal"
											value={email}
											onChange={e => setEmail(e.target.value)}
											InputLabelProps={{ style: { color: "#dcdcdc" } }}
										/>
										<TextField
											required
											id="password"
											label="Password"
											variant="standard"
											type="password"
											className="form-field"
											margin="normal"
											value={password}
											onChange={e => setPassword(e.target.value)}
											InputLabelProps={{ style: { color: "#dcdcdc" } }}
										/>
										<FormControlLabel
											control={
												<Checkbox
													checked={userTypes.customer}
													onChange={() => handleUserTypeChange("customer")}
												/>
											}
											label="Customer"
										/>
										<FormControlLabel
											control={
												<Checkbox
													checked={userTypes.repairCenter}
													onChange={() => handleUserTypeChange("repairCenter")}
												/>
											}
											label="Repair Center"
										/>
										<FormControlLabel
											control={
												<Checkbox
													checked={userTypes.repairPartsSeller}
													onChange={() =>
														handleUserTypeChange("repairPartsSeller")
													}
												/>
											}
											label="Repair Parts Seller"
										/>
										<Button
											className="submit"
											variant="contained"
											onClick={handleRegistration}
										>
											Register
										</Button>
										<h4
											style={{
												paddingLeft: "20px",
											}}
										>
											Already have an account? <a href="/login">Sign in</a>
										</h4>
									</FormControl>
								)}

								{/* <p>
									By signing up, you will agree to the
									<Link
										href="#"
										variant="body2"
									>
										Terms of Services{" "}
									</Link>
									and
									<Link
										href="#"
										variant="body2"
									>
										{" "}
										Privacy Policy
									</Link>
								</p> */}
								{/* <div style={{ marginTop: "20px" }}>
									Already have an account ?&nbsp;
									<Link
										href="/login"
										variant="body2"
									>
										Login Here
									</Link>
								</div> */}
							</CardContent>
						</div>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
};

export default Welcome;
