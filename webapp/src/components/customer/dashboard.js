import { useParams } from "react-router-dom";
import * as React from "react";
import SideMenu from "./SideMenu";

const pages = ["Products"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const CustomerDashboard = () => {
	const { customerId } = useParams();

	return (
		<div>
			<SideMenu />
		</div>
	);
};

export default CustomerDashboard;
