import React, { Component } from 'react';
import './signin.css';
import Art from './img/Asset1.png';
import logo from './img/logo-white.png';

class Signin extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: ''
		};
	}
	onChangeEmail = (e) => {
		this.setState({ email: e.target.value });
		console.log(e.target.value);
	};
	onChangePassword = (e) => {
		this.setState({ password: e.target.value });
		console.log(e.target.value);
	};
	onSubmit = () => {
		fetch('http://localhost:5000/signin', {
			method: 'post',
			headers: { 'Content-Type': 'application/JSON' },
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password
			})
		})
			.then((Response) => Response.json())
			.then((res) => console.log(res));
	};

	render() {
		return (
			<div>
				<header className="header container">
					<div className="logo-box">
						<img src={logo} alt="logo" className="logo" />
					</div>

					<div className="text-box">
						<h1 className="heading-primary">
							<div className="logo-box2">
								<img src={Art} alt="logo" className="logo2" />
							</div>
							{/* <!-- <span class="heading-primary-main">SIGNIN</span> --> */}

							<span className="heading-primary-main1"> EMail</span>
							<input
								className="heading-primary-sub"
								type="text"
								name="email"
								onChange={this.onChangeEmail}
								value={this.state.email}
							/>
							<span className="heading-primary-main1"> Password</span>
							<input
								className="heading-primary-sub"
								type="password"
								name="password"
								onChange={this.onChangePassword}
							/>
						</h1>
						<button className="btn btn-outline-secondary " onClick={this.onSubmit}>
							Login
						</button>
					</div>
				</header>
			</div>
		);
	}
}
export default Signin;
