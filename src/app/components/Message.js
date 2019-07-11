import React, { Component } from "react";

import '../styles/Message.scss';

class Message extends Component {

	render() {
		const { nick, msg, id } = this.props;
		return (<div id={id} className="message"><strong>{nick}</strong><p>{msg}</p></div>)
	}
}

export default Message;