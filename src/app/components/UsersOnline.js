import React, { Component } from "react";
import ActiveUsers from "./ActiveUsers.js";

import '../styles/UsersOnline.scss';

class UsersOnline extends Component {

	render() {
		return(
			<div className="userOnline-wrapp">
				<h2 className="descrUser">Users online</h2>
				<ActiveUsers />
			</div>
		)
	}
}

export default UsersOnline;