import "./App.css";
import Welcome from "./components/Welcome";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/auth/login";
import RegisterPage from "./components/auth/register";
import { routes } from "./components/includes/routes";
import CustomerDashboard from "./components/customer/dashboard";
import RepaircenterDashboard from "./components/repaircenters/dashboard";
import WorkerDashboard from "./components/workers/dashboard";
import AdminDashboard from "./components/admin/dashboard";

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route
						exact
						path="/"
						element={<Welcome />}
					/>
					<Route
						path="/login"
						element={<LoginPage />}
					/>
					<Route
						path="/register"
						element={<RegisterPage />}
					/>
					<Route
						path={routes.customerDashboard}
						element={<CustomerDashboard />}
					/>
					<Route
						path={routes.repairCenterDashboard}
						element={<RepaircenterDashboard />}
					/>
					<Route
						path={routes.workerDashboard}
						element={<WorkerDashboard />}
					/>
					<Route
						path={routes.adminDashboard}
						element={<AdminDashboard />}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
