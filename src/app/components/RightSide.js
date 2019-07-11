import React, { Component } from "react";
import UserLogInOut from './UserLogInOut.js'
import UsersOnline from './UsersOnline.js'
import UserIn from './UserIn.js'

import '../styles/RightSide.scss';

class RightSide extends Component {
	
	render() {
		return(
			<div className="rightSide">
				<UsersOnline />
				<UserLogInOut />
			</div>
		)
	}
}

export default RightSide;