import React from 'react';
import '../App.css';
import twitter from '../img/twitter.png';
import summarize from '../img/summarize.png';
import Footer from './Footer';
import { Card, CardText, CardDeck, CardTitle, Row, Col } from 'reactstrap';

const Appselect = (props) => {
	return (
		<div className="idk">
			<Row sm="4">
				<Col sm="4">
					<CardDeck
						className="text-center justify-content-center"
						style={{ marginLeft: '1px', float: 'left', width: '200%', height: 'auto' }}
					>
						<Card
							className="cards text-center"
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
								style={{ width: '40px', marginLeft: '110px' }}
							/>
							<CardText>Analyse the twitter feeds for the keyword entered</CardText>
							<div className="parentElement">
								<button
									className="btn btn-lg btn-info "
									style={{ marginLeft: '25px', color: 'black', top: '9px' }}
									onClick={() => props.history.push('/twitter')}
								>
									Tweet
								</button>
							</div>
						</Card>

						<Card
							className="cards text-center"
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
								style={{ width: '40px', marginLeft: '110px' }}
							/>
							<CardText>Create a Summarization for the entered Text</CardText>
							<div className="parentElement">
								<button
									className="btn btn-lg btn-info "
									style={{
										marginLeft: '5px',
										color: 'black',
										textAlign: 'left',
										top: '10px',
										left: '15px'
									}}
									onClick={() => props.history.push('/textsum')}
								>
									Summarize
								</button>
							</div>
						</Card>
					</CardDeck>
				</Col>
			</Row>
			<Footer style={{ 'margin-bottom': 50 }} />
		</div>
	);
};

export default Appselect;
