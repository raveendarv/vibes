import React, { Component } from 'react';
import '../App.css';
import twitter from '../img/twitter.png';
import summarize from '../img/summarize.png';
import Footer from './Footer';
import Twitter from './Twitter';
import Textsum from './Textsum';
import { Route, Link } from 'react-router-dom';
import { Card, CardText, CardDeck, CardTitle, Row, Col, Button } from 'reactstrap';

// class Appselect extends Component {
// 	state = {
// 		route: ''
// 	};
// }
export default (props) => {
	return (
		<div className="idk">
			<Row sm="4">
				<Col sm="4">
					<CardDeck
						className="text-center justify-content-center"
						style={{ width: '50rem', marginLeft: '1px', float: 'left', width: '200%', height: 'auto' }}
					>
						<Card
							className="card text-center"
							body
							outline
							color="info"
							inverse
							style={{ backgroundColor: '#333', borderColor: '#333' }}
						>
							<CardTitle className="text-danger">
								<h4>Tweet Analysis</h4>
							</CardTitle>
							<img
								src={twitter}
								alt="Twitter logo "
								className="logo"
								style={{ width: '40px', marginLeft: '90px' }}
							/>
							<CardText>Analyse the twitter feeds for the keyword entered</CardText>
							<div className="parentElement">
								<Link
									className="btn btn-lg btn-info "
									style={{ marginLeft: '25px', color: 'black', top: '9px' }}
									to="/twitter"
								>
									Tweet
								</Link>
								<Route exact path="/twitter" component={Twitter} />
							</div>
						</Card>

						<Card
							className="card text-center"
							body
							outline
							color="info"
							inverse
							style={{ backgroundColor: '#333', borderColor: '#333' }}
						>
							<CardTitle className="text-danger">
								<h4>Text Summary</h4>
							</CardTitle>
							<img
								src={summarize}
								alt="Summarize logo "
								className="logo"
								style={{ width: '40px', marginLeft: '90px' }}
							/>
							<CardText>Create a Summarization for the entered Text</CardText>
							<div class="parentElement">
								<Link
									className="btn btn-lg btn-info "
									style={{
										marginLeft: '5px',
										color: 'black',
										textAlign: 'left',
										top: '10px',
										left: '15px'
									}}
									to="/textsum"
								>
									Summarize
								</Link>

								<Route exact path="/textsum" component={Textsum} />
							</div>
						</Card>
					</CardDeck>
				</Col>
			</Row>
			<Footer />
		</div>
	);
};
