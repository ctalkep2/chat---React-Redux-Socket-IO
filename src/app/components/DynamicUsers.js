import React, { Component } from "react";

import '../styles/DynamicUsers.scss';

class DynamicUsers extends Component {
	render() {
		const { users, id } = this.props;
		return (<div id={id} className="user">{users}</div>)
	}
}

export default DynamicUsers;