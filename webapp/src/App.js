import "./App.css";
import Welcome from "./components/Welcome";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./components/auth/login";
import RegisterPage from "./components/auth/register";

function App() {
	return (
		<Router>
		<div className="App">
		  <Routes>
			<Route exact path="/" element={<Welcome/>} />
			<Route path="/login" element={<LoginPage/>} />
			<Route path="/register" element={<RegisterPage/>} />
		  </Routes>
		</div>
	  </Router>
	);
}

export default App;
