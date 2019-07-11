import React, { Component } from "react";
import { connect } from "react-redux";
import { store } from '../store/store';
import { saveMessage } from "../actions/actions";
import { socket } from "../socket/api";

import '../styles/InputMessage.scss';

class InputMessage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		event.preventDefault();

		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
    event.preventDefault();

    let { currentUser } = this.props
    
    if (currentUser !== 'empty') {
	    store.dispatch(
	    	saveMessage(
	    		{ nick: currentUser, msg: this.state.value }
	    	)
	    );
	    socket.emit('addMessage', 
	    	{ nick: currentUser, msg: this.state.value }
	    );
	    socket.emit('returnMessage');
  	}

    this.setState({value: ''});
  }

	render() {
		return(
			<div className="formMess-wrapp">
				<form className="formMess" onSubmit={this.handleSubmit}>
					<input 
						className="inputMess"
						value={this.state.value}
						onChange={this.handleChange} 
					/>
					<button className="sendMess">Send message</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = store => {
  return {
    currentUser: store.currentUser
  }
};

export default connect(
	mapStateToProps
)(InputMessage);