import React, { Component } from "react";
import InputMessage from './InputMessage';
import Messages from './Messages';

import '../styles/Chat.scss';

class Chat extends Component {

	constructor() {
		super();
		this.state = {
			height: window.innerHeight,
			chatHeight: window.innerHeight - 50
		}
	}

	componentDidMount() {		
		window.onresize = (event) => {
			this.setState({height: window.innerHeight + 'px'});
			this.setState({chatHeight: (window.innerHeight - 50) + 'px'});
		}

	}

	render() {
		return(			
			<div id="mesW" className="messageWin" style={{height: this.state.height}}>
				<div className="chat-wrapp" style={{height: this.state.chatHeight}}>
					<Messages className="chat" />
				</div>
				<InputMessage />
			</div>
		)
	}
}

export default Chat;