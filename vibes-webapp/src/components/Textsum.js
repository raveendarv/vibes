import React, { Component } from 'react';
import Finaltextsum from './Finaltextsum';
import Footer from './Footer';

export default class Textsum extends Component {
	state = {
		text: '',
		url: '',
		data: {
			ctext: '',
			final_summary: '',
			final_time: 0,
			final_reading_time: 0,
			summary_reading_time: 0
		},
		finaltext: false
	};

	loadData = (data) => {
		console.log('loadData');
		this.setState({ finaltext: true });
		this.setState({
			data: {
				ctext: data[0].ctext,
				final_summary: data[0].final_summary,
				final_time: data[0].final_time,
				final_reading_time: data[0].final_reading_time,
				summary_reading_time: data[0].summary_reading_time
			}
		});
		console.log(data[0].ctext);
	};

	onSubmitText = () => {
		fetch('http://localhost:5000/analyze', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				text: this.state.text
			})
		})
			.then((response) => response.json())
			.then((data) => {
				if (data) {
					this.loadData(data);
				}
			});
	};

	onSubmitUrl = () => {
		fetch('http://localhost:5000/analyze_url', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				url: this.state.url
			})
		})
			.then((response) => response.json())
			.then((data) => {
				if (data) {
					console.log(data);
					this.loadData(data);
				}
			});
	};
	render() {
		return (
			<div>
				<div className="container">
					<div className="jumbotron jumbotron-fluid bg-dark text-white px-3">
						<h1 className="display-4">IDENTIFY THE IMPORTANT IDEAS AND FACTS</h1>
						<hr className="my-4 red h-5" />
						<p className="lead ">
							<span className="text-danger">
								Summarization Simplified Using SpaCy,Gensim,NLTK and Sumy.
							</span>
							Summarization Simplified Using SpaCy,Gensim,NLTK and Sumy To help you
							<span className="text-danger"> summarize and analyze </span>
							your argumentative texts, your articles, your scientific texts, your history texts as well
							as your well-structured analyses work of art, Resoomer provides you with a "Summary text
							tool" : an educational tool that identifies and summarizes the
							<span className="text-danger"> important ideas and facts </span> of your documents.
							Summarize in 1-Click, go to the main idea or skim through so that you can then interpret
							your texts quickly and develop your <span className="text-danger"> syntheses. </span>
						</p>
					</div>

					<div className="form-group">
						<label className="display-4" style={{ color: 'black' }}>
							Enter Text Here
						</label>
						<textarea
							className="form-control"
							name="text"
							id="exampleFormControlTextarea1 py-4 "
							onChange={(e) => {
								this.setState({ text: e.target.value });
							}}
							value={this.state.search}
							placeholder="TEXT"
							rows="10"
							required="true"
						/>
						<button className="btn btn-lg btn-info" onClick={this.onSubmitText}>
							Summarize
						</button>
					</div>
					<div>
						<label className="display-4" style={{ color: 'black' }}>
							Enter URL Here
						</label>
						<input
							type="text"
							className="form-control"
							name="url"
							placeholder="URL"
							onChange={(e) => {
								this.setState({ url: e.target.value });
							}}
							required="true"
						/>
						<button className="btn btn-lg btn-info" onClick={this.onSubmitUrl}>
							Summarize
						</button>
					</div>
				</div>
				{this.state.finaltext ? <Finaltextsum data={this.state.data} /> : <p> Robot</p>}
				<Footer />
			</div>
		);
	}
}
