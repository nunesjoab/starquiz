import React, { Component } from 'react'

import './Score.css'

export default class Score extends Component {
	constructor (props) {
		super (props)

		this.state = {
			points: 0,
			player: '',
			email: '',
		}
	}

	componentDidMount() {
		const player = this.props.player
		const score = JSON.parse(localStorage.getItem(player))
		console.log(score)

		const points = score.points * 10
		this.setState({ points })
	}

	saveScoreHandler = () => {
		const player = this.props.player

		let points = {
			'points': this.state.points / 10,
			'player': this.state.player,
			'email': this.state.email,
		}

		localStorage.setItem(player, JSON.stringify(points))
		this.props.restartGame()
	}

  	render() {
		return (
	  		<div className="container score">
				<h1 className="title">Tempo esgotado!</h1>
				<h3>Sua pontuação foi:</h3>
				<span>{this.state.points} PONTOS</span>
				<div className="player">
					<p>
						<label>Nome</label>
					</p>
						<input type="text" required value={this.state.player} onChange={(event) => this.setState({ player: event.target.value })} />
					<p>
						<label>E-mail</label>
					</p>
						<input type="email" required value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />
				</div>
				<button
					style={{
						marginTop: '24px',
						padding: '12px 24px',
						fontSize: '18px',
						fontWeight: '600',
					}}
					onClick={() => this.saveScoreHandler()}
				>
					Reinicar jogo
				</button>
	  		</div>
		)
  	}
}
