import React, { Component } from "react";
import Chat from './Chat.js';
import RightSide from './RightSide.js';

import '../styles/App.scss';

class App extends Component {
	render() {
		return (
			<div className="chatApp">
				<Chat />
				<RightSide />
			</div>
		);
	}
}

export default App;