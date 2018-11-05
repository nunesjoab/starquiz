import React, { Component } from 'react'

import Fade from 'react-reveal/Fade'
import './Guess.css'

export default class Guess extends Component {
	constructor(props) {
		super(props)
		// this.backButton = React.createRef()
		// this.disableBackButton = this.disableBackButton.bind(this)
		this.state = {
			input: '',
		}
	}

	componentWillUnmount() {
		console.log('Will Unmount')
		this.checkAnswer()
	}

	checkAnswer = () => {
		const inputValue = this.state.input
		this.props.inputValue(inputValue)
	}

	renderBackButton() {
		if (this.state.input === '') {
			return (
			<button
				onClick={this.props.closeGuess}
			>
				Voltar
			</button>

			)
		}
	}
	// checkAnswer = () => {
	// 	if(this.state.input !== '') {
	// 		if (this.state.input === this.props.name) {
	// 			console.log('Right answer!!')
	// 		}
	// 		this.sendInputToParentComponent()
	// 	}
	// 	this.props.closeGuess()
	// }

  	render() {
		return (
			<div className="modal">
				<Fade left>
					<div className="guess-container">
						<h3 className="title">Qual o nome do personagem? </h3>
						<input
							autoFocus
							placeholder="Digite sua resposta"
							value={this.state.input}
							type="text"
							onChange={(event) => this.setState({ input: event.target.value })}
						/>
						<p>{this.props.name}</p>
						<div className="button-container">
							<button onClick={this.props.closeGuess}>Confirmar</button>
							{this.renderBackButton()}
						</div>
					</div> 
				</Fade>
			</div>
		)
	}
}
