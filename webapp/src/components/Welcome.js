import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import "./css/welcome.css";
import background1 from "../assets/images/background-1.jpg";
import background2 from "../assets/images/background-1.jpg";

const Welcome = () => {
	const [currentImage, setCurrentImage] = useState(0);
	const images = [background1, background2];

	const goToImage = index => {
		setCurrentImage(index);
	};

	return (
		<div
			className="main-container"
			maxWidth="lg"
		>
			<Grid
				container
				justifyContent="center"
				alignItems="center"
			>
				<Grid
					item
					lg={8}
					sm={12}
				>
					<div className="left-content">
						<div className="carousel">
							<div className="image-container">
								<div className="text">
									<h1>Welcome To</h1>
									<h1>Vehicle Guardian</h1>
									<p>
										This app is a comprehensive solution bridging the gap
										<div>between vehicle owners and repair centers,</div>
										streamlining the entire repair and maintenance process
									</p>
								</div>
								<img
									className="image-contain"
									src={images[currentImage]}
									alt={`${currentImage + 1}`}
								/>
								<div className="buttons">
									{images.map((_, index) => (
										<button
											key={index}
											className={index === currentImage ? "active" : ""}
											onClick={() => goToImage(index)}
										></button>
									))}
								</div>
							</div>
						</div>
					</div>
				</Grid>
				<Grid
					item
					lg={4}
					sm={12}
				>
					<Card class="new-card">
						<div className="right-content">
							<CardContent className="second-column-cardcontents">
								<h2>Login Options</h2>
								<Button
									variant="outlined"
									color="primary"
									fullWidth
									style={{ marginBottom: "10px" }}
									endIcon={<i className="fab fa-google"></i>}
								>
									Sign Up using Google
								</Button>
								<Button
									variant="outlined"
									color="contained"
									fullWidth
									style={{ marginBottom: "10px" }}
									endIcon={<i className="fab fa-facebook"></i>}
								>
									Sign Up using Facebook
								</Button>
								<h3 class="text-center">OR</h3>
								<Link
									variant="contained"
									color="primary"
									fullWidth
									id="login-options-buttons"
									component={Link}
									href="/register"
									>
									Create an Account
									</Link>
								<p>
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
								</p>
								<div style={{ marginTop: "20px" }}>
									Already have an account ?&nbsp;
									<Link
										href="/login"
										variant="body2"
									>
										Login Here
									</Link>
								</div>
							</CardContent>
						</div>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
};

export default Welcome;
