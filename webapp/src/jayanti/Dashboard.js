import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
	const [showCard, setShowCard] = useState(false);
	const [showCardRegister, setShowCardRegister] = useState(false);

	const handleShowCard = () => {
		setShowCard(true);
	};
	const handleShowCardRegister = () => {
		setShowCardRegister(true);
	};

	const handleCloseCardRegister = () => {
		setShowCardRegister(false);
	};
	const handleCloseCard = () => {
		setShowCard(false);
	};

	return (
		<div className="app">
			<div className="leftPart">
				<h1 className="header">Welcome</h1>
			</div>

			<div className="rightPart">
				<div className="buttons">
					<div>
						<Button
							className="button"
							onClick={handleShowCard}
						>
							Sign up with Google
						</Button>{" "}
						<br />
						<Button
							className="button"
							onClick={handleShowCard}
						>
							Sign up with Apple
						</Button>
					</div>
					<h6 style={{ marginLeft: 140, fontWeight: "bold" }}>or</h6>
					<div>
						<Button
							className="button"
							onClick={handleShowCardRegister}
						>
							Create Account
						</Button>
					</div>
					<div style={{ marginLeft: 20, color: "silver" }}>
						<h7>
							By signing up, you agree to the{" "}
							<a
								href=""
								style={{ color: "white" }}
							>
								Terms of <br />
								Services
							</a>{" "}
							and{" "}
							<a
								href=""
								style={{ color: "white" }}
							>
								Privacy Policy.
							</a>
						</h7>
					</div>
					<div>
						<h5 style={{ marginLeft: 50, fontWeight: "bold", paddingTop: 60 }}>
							Already have an account?
						</h5>
						<Button
							className="button"
							onClick={handleShowCard}
						>
							Sign in into your account
						</Button>
					</div>
				</div>
				{showCard && (
					<div className="modal-container">
						<div
							className="modal-background"
							onClick={handleCloseCard}
						/>
						<div className="modal-content">
							<Card
								style={{
									width: "30rem",
									margin: "10px",
									backgroundColor: "#555d50",
								}}
							>
								<Card.Header>
									<Card.Title
										style={{
											fontWeight: "bold",
											color: "white",
											paddingTop: 30,
											paddingLeft: 45,
										}}
									>
										Login into your account
									</Card.Title>
									<a
										className="close-button"
										onClick={handleCloseCard}
									>
										<h3>x</h3>
									</a>
								</Card.Header>
								<Card.Body>
									<Card.Text className="modal-text">
										<Form>
											<FloatingLabel
												controlId="floatingInput"
												label="Email address"
												className="mb-3"
											>
												<Form.Control
													type="email"
													placeholder="name@example.com"
												/>
											</FloatingLabel>
											<FloatingLabel
												controlId="floatingPassword"
												label="Password"
											>
												<Form.Control
													type="password"
													placeholder="Password"
												/>
											</FloatingLabel>
											<FloatingLabel
												style={{
													paddingTop: 15,
													color: "white",
												}}
												controlId="formBasicCheckbox"
												className="mb-3 textfield"
											>
												<Form.Check
													type="checkbox"
													label="I agree to all Terms of Services and Privacy Policies."
												/>
											</FloatingLabel>
											<Button
												className="formButton"
												variant="primary"
												type="submit"
											>
												Login
											</Button>
										</Form>
									</Card.Text>
								</Card.Body>
							</Card>
						</div>
					</div>
				)}

				{showCardRegister && (
					<div className="modal-container">
						<div
							className="modal-background"
							onClick={handleCloseCardRegister}
						/>
						<div className="modal-content">
							<Card
								style={{
									width: "30rem",
									margin: "10px",
									backgroundColor: "#555d50",
								}}
							>
								<Card.Header>
									<Card.Title
										style={{
											fontWeight: "bold",
											color: "white",
											paddingTop: 30,
											paddingLeft: 45,
										}}
									>
										Login into your account
									</Card.Title>
									<a
										style={{
											top: "12%",
										}}
										className="close-button"
										onClick={handleCloseCardRegister}
									>
										<h3>x</h3>
									</a>
								</Card.Header>
								<Card.Body>
									<Card.Text className="modal-text">
										<Form>
											<FloatingLabel
												controlId="floatingInput"
												label="Email address"
												className="mb-3 textfield"
											>
												<Form.Control
													type="email"
													placeholder="name@example.com"
												/>
											</FloatingLabel>

											<FloatingLabel
												controlId="floatingPassword"
												label="Password"
												className="mb-3 textfield"
											>
												<Form.Control
													type="password"
													placeholder="Password"
												/>
											</FloatingLabel>

											<FloatingLabel
												controlId="floatingPassword"
												label="Re-enter Password"
												className="mb-3 textfield"
											>
												<Form.Control
													type="password"
													placeholder="Re-enter Password"
												/>
											</FloatingLabel>

											<FloatingLabel
												controlId="floatingPassword"
												label="Contact Number"
												className="mb-3 textfield"
											>
												<Form.Control
													type="number"
													placeholder="Contact Number"
												/>
											</FloatingLabel>

											<FloatingLabel
												style={{
													paddingTop: 15,
													color: "white",
												}}
												controlId="formBasicCheckbox"
												className="mb-3 textfield"
											>
												<Form.Check
													type="checkbox"
													label="I agree to all Terms of Services and Privacy Policies."
												/>
											</FloatingLabel>

											<Button
												className="formButton"
												type="submit"
											>
												Register
											</Button>
										</Form>
									</Card.Text>
								</Card.Body>
							</Card>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
