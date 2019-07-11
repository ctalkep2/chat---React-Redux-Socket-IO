import React, { Component } from "react";

import '../styles/StaticUsers.scss';

class StaticUsers extends Component {
	render() {
		const { users } = this.props
		return(
			<p className="staticUser">{users}</p>
		);
	}
}

export default StaticUsers;