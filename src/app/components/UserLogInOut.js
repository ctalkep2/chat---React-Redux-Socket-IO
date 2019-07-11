import React, { Component } from "react";
import UserOut from './UserOut';
import UserIn from './UserIn';
import { connect } from "react-redux";
import { socket } from "../socket/api";
import { validateUser, addUser, currentUser } from "../actions/actions";
import { store } from '../store/store';

import '../styles/UserLogInOut.scss';

class UserLogInOut extends Component {

	constructor(props) {
		super(props);
		this.state = {
			nickName: ''
		};
	}
	
	componentDidMount() {
  	socket.on('userValidation', validation => {

  		store.dispatch(validateUser(validation));
  		console.log(validation);
  		if (validation === true) {
  			store.dispatch(currentUser(this.props.currentUserWrapper));
    		store.dispatch(addUser(this.props.currentUserWrapper));
  		}
  	});
  }

	render() {
		let { userLogin } = this.props;

		if (userLogin === false) {
			return(
				<UserIn
				/>
			)
		}
		else {
			return(
				<UserOut
				/>
			) 
		}
	}
}

const mapStateToProps = store => {
  return {
    userLogin: store.userLogin,
    currentUserWrapper: store.currentUserWrapper
  }
};

export default connect(
	mapStateToProps
)(UserLogInOut);