import React, { Component } from "react";
import Message from './Message';
import { socket } from "../socket/api";
import { connect } from "react-redux";
import { messagesUpdate } from "../actions/actions";
import { store } from '../store/store';

import '../styles/Messages.scss';

class Messages extends Component {

	constructor(props) {
		super(props);
		this.state = {}

		socket.emit('returnMessage');
	}

	componentDidMount() {
		socket.on('returnMessage', messages => {
			store.dispatch(messagesUpdate(messages));
		});
	}

	render() {
		let { messages } = this.props;

		if (this.state.messages !== []) {
			return messages.map((item, key) => {
				return (
					<Message 
						key={item.nick + key}						
						nick={item.nick}
						msg={item.msg} 
						id={key} 
					/>
				)
			});
		}
	}

}

const mapStateToProps = store => {
  return {
    messages: store.messages
  }
};

export default connect(
	mapStateToProps
)(Messages);