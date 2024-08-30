import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import HomePage from "./components/HomePage";
import PrivateRoute from "./PrivateRoute";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="/home"
					element={
						<PrivateRoute>
							<HomePage />
						</PrivateRoute>
					}
				/>
				<Route path="*" element={<Navigate to="/login" />} />
			</Routes>
		</Router>
	);
}

export default App;
