import React, { Component } from 'react'

export default class FrontPage extends Component {
	
  render() {
	return (
		<div className="container">
			<h1
				className="title"
				style={{
					color: '#fff',
					letterSpacing: '2px',
				}}
			>
				StarQuiz
            </h1>
			<img src="cover.jpeg" alt="Let's play"></img>
			<div>
				<button
					style={{
						marginTop: '24px',
						padding: '24px 40px',
						fontSize: '24px',
						fontWeight: '600',
					}}
					onClick={this.props.startGame}
					onMouseUp={this.props.startTimer}
				>
					Jogar
				</button>
			</div>
		</div>
	)
  }
}
