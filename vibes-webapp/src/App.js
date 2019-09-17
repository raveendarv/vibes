import React, { Component } from 'react';
import './App.css';
import Twitter from './components/Twitter';
import Textsum from './components/Textsum';
import Signin from './components/Signin/Signin';
import Appselect from './components/Appselect';
import { Route } from 'react-router-dom';

class App extends Component {
	state = {
		route: 'textsum'
	};

	render() {
		// const { route } = this.state;
		return (
			<div>
				{/* {route === 'twitter' ? <Twitter /> : route === 'textsum' ? <Textsum /> : <Signin />} */}
				<Route exact path="/" component={Signin} />
				<Route exact path="/appselect" component={Appselect} />
				<Route exact path="/twitter" component={Twitter} />
				<Route exact path="/textsum" component={Textsum} />
			</div>
		);
	}
}

export default App;
