import React, { Component } from 'react'

import Fade from 'react-reveal/Fade'
import './Guess.css'

export default class Guess extends Component {
	constructor(props) {
		super(props)
		this.state = {
			input: '',
		}
	}

	componentWillUnmount() {
		this.checkAnswer()
	}

	checkAnswer = () => {
		if (this.state.input !== '') {
			const inputValue = this.state.input
			this.props.inputValue(inputValue)
			this.props.invalid(this.props.personaId)
		}
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
