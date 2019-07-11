import React, { Component } from "react";
import { removeUser } from "../socket/api";
import { currentUser, userLogout, validateUser } from "../actions/actions";
import { connect } from "react-redux";
import { store } from '../store/store';
import { socket } from "../socket/api";

import '../styles/UserOut.scss';

class UserOut extends Component {

	constructor(props) {
		super(props);
		this.state = {};		

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
    event.preventDefault();
    
    socket.emit('userOut', this.props.currentUser);
    store.dispatch(userLogout(this.props.currentUser));    

    store.dispatch(validateUser(false));
    store.dispatch(currentUser('empty'));

    socket.emit('userUpdate');
    socket.emit('close_conn');
  }

  componentDidMount() {
  	socket.on('close_conn', () => {
			location.reload();
  	});
  }

	render() {
		return(
			<div className="userOut-wrapp">
				<form className="userLogout" onSubmit={this.handleSubmit}>
					<div className="logout">
						<label className="logoutLabel">Click to logout</label>
						<button 
							className="button-logout"
						>Log out</button>
					</div>				
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
)(UserOut);