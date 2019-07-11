import React, { Component } from "react";
import StaticUsers from "./StaticUsers.js";
import DynamicUsers from "./DynamicUsers.js";
import { socket } from "../socket/api";
import { connect } from "react-redux";
import { userUpdate } from "../actions/actions";
import { store } from '../store/store';

import '../styles/ActiveUsers.scss';

class ActiveUsers extends Component {

	constructor(props) {
		super(props);
		this.state = {
			users: 'No users online'
		};

		socket.emit('userUpdate');
	}

	componentDidMount() {
		socket.on('userUpdate', activeUsers => {
			store.dispatch(userUpdate(activeUsers));
		});
	}
	
	render() {
		let { usersList } = this.props;

		if (usersList[0] === undefined) {

			return(
				<ul className="usersOnline">
					<StaticUsers
						users={this.state.users}
					/>
				</ul>
			)
		} else {
			return usersList.map((item, key) => {
				return (
					<DynamicUsers
						key={item + key}
						users={item}
						id={item}
					/>
				)
			});
		}
		return (<h1>hello</h1>);
	}

}

const mapStateToProps = store => {
  return {
    usersList: store.usersList
  }
};

export default connect(
	mapStateToProps
)(ActiveUsers);