import React, { Component } from "react";
import { connect } from "react-redux";
import { socket } from "../socket/api";
import { chatMessage, createUserIO } from "../socket/api";
import { currentUserWrapper } from "../actions/actions";
import { store } from '../store/store';

import '../styles/UserIn.scss';

class UserIn extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			password: '',
			login: false,
			validation: false
		}
		socket.emit('userUpdate'); 

		this.handleChange = this.handleChange.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this);
		this.handleSubmitLogIn = this.handleSubmitLogIn.bind(this);
		this.handleSignin = this.handleSignin.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleChange(event) {
		event.preventDefault();

  	this.setState({name: event.target.value});
	}

	handleChangePassword(event) {
		event.preventDefault();

		this.setState({password: event.target.value});
	}

	handleSubmitLogIn(event) {
		let user = this.state.name;
		let password = this.state.password;
		let { userLogin } = this.props;

    event.preventDefault();

    if (user !== '' & password !== '') {
    	socket.emit('userValidation', user);
			socket.emit('userLogin', {nickName: user, password: password});
			socket.emit('userUpdate');
			store.dispatch(currentUserWrapper(user));
		}

    this.setState({ name: '', password: '' });
	}

	handleSubmitSignUp(event) {
		let user = this.state.name;
		let password = this.state.password;
		let { userLogin } = this.props;

    event.preventDefault();

    if (user !== '' & password !== '') {
			// socket.emit('userValidation', user);
			socket.emit('userSignUp', {nickName: user, password: password});
			socket.emit('userUpdate');
			store.dispatch(currentUserWrapper(user));
		}

    this.setState({ name: '', password: '' });
  }

  handleSignin() {
  	this.setState({ login: false });
  }

  handleLogin() {
  	this.setState({ login: true });
  }

	render() {
		if (this.state.login !== false) {
			return(
				<div className="userIn-wrapp">
					<div className="crAccWarp">
						<button onClick={this.handleSignin}>Sign up</button>
						<button onClick={this.handleLogin}>Log In</button>
					</div>
					<form className="userLogin" onSubmit={this.handleSubmitLogIn}>
						<div className="login-wrapp">
							<div className="login">
								<label className="spanInput">Login</label>
								<input 
									id="loginInput" 
									className="loginInput" 
									value={this.state.name} 
									onChange={this.handleChange} />
							</div>
						</div>
						<div className="login-wrapp">
							<div className="password">
								<label className="spanInput">Password</label>
								<input 
									className="passwordInput"
									value={this.state.password}
									onChange={this.handleChangePassword}
								/>
							</div>
						</div>
						<div className="button-wrap">
							<button className="button-login">Login</button>
						</div>					
					</form>
				</div>
			)
		}	else {
			return(
				<div className="userIn-wrapp">
					<div className="crAccWarp">
						<button onClick={this.handleSignin}>Sign up</button>
						<button onClick={this.handleLogin}>Log In</button>
					</div>
					<form className="userSignIn" onSubmit={this.handleSubmitSignUp}>
						<div className="signIn-wrapp">
							<div className="signIn">
								<label className="spanInput">Sign Up</label>
								<input 
									id="signInInput" 
									className="signInInput" 
									value={this.state.name} 
									onChange={this.handleChange} />
							</div>
						</div>
						<div className="signIn-wrapp">
							<div className="password">
								<label className="spanInput">Password</label>
								<input 
									className="passwordInput"
									value={this.state.password}
									onChange={this.handleChangePassword}
								/>
							</div>
						</div>
						<div className="button-wrap">
							<button className="button-signIn">Sign Up</button>
						</div>	
					</form>
				</div>
			)
		}
	}
}

const mapStateToProps = store => {
  return {
    userLogin: store.userLogin
  }
};

export default connect(
	mapStateToProps
)(UserIn);