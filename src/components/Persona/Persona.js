import React, {Component} from 'react'

import axios from '../../axios'

import Flip from 'react-reveal/Flip'
import './Persona.css'

import Aux from '../../hoc/Auxiliar/Auxiliar'
import Hint from '../Hint/Hint'
import Guess from '../Guess/Guess'


export default class Persona extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullPoints: true,
            films: null,
            input: null,
            invalid: this.props.negate,
            planet: null,
            showGuess: false,
            showHint: false,
            trueAnswer: false,
            vehicles: null,
        }
    }

    getPersonaDetails = () => {
        let planet= []
        let films = []
        let vehicles = []

        axios.get(this.props.planetUrl)
        .then(response => {
            planet.push(response.data.name)
            this.setState({
                planet: planet.join(', ')
            })
        })

        for (let i = 0; i < this.props.filmsArray.length; i++) {
            axios.get(this.props.filmsArray[i])
                .then(response => {
                    films.push(response.data.title)
                    this.setState({
                        films: films.join(', ')
                    })
                })
        }

        for (let i = 0; i < this.props.vehiclesArray.length; i++) {
            axios.get(this.props.vehiclesArray[i])
                .then(response => {
                    vehicles.push(response.data.name)
                    this.setState({
                        vehicles: vehicles.join(', ')
                    })
                })
        }
    }

    showHintToggle = () => {
        this.setState((prevState) => {
            return { showHint: !prevState.showHint }
        })
        this.setState({ fullPoints: false})
    }

    showGuessToggle = () => {
        this.setState((prevState) => {
            return {
                showGuess: !prevState.showGuess,
            }
        })

        if (this.state.showHint) {
            this.setState((prevState) => {
                return { showHint: !prevState.showHint }
            })
        }
    }

    getInputValue = (value) => {
        this.setState({ input: value })

        if (value !== '') {
            this.setState({ invalid: true })
        }


        if (this.props.name === value) {
            this.setState({ trueAnswer: true })

            const player = this.props.player
            let storedScore = localStorage.getItem(player)
            
            storedScore = JSON.parse(storedScore)
            let updatedPoints = ''
            
            console.log(updatedPoints)
            
            if (this.state.fullPoints) {
                updatedPoints = { points: storedScore.points + 1}
            } else {
                updatedPoints = { points: storedScore.points + .5}
            }
            
            console.log(updatedPoints)
            localStorage.setItem(player, JSON.stringify(updatedPoints))
        }
    }

    renderHintContainer() {
        if (this.state.showHint && !this.state.invalid) {
            return (
                <Aux>
                    <Hint
                        personaId={this.props.id}
                        hair={this.props.hair}
                        height={this.props.height}
                        planet={this.state.planet}
                        films={this.state.films}
                        vehicles={this.state.vehicles ? this.state.vehicles : 'Nenhum'}
                        closeHint={this.showHintToggle}
                        giveTry={this.showGuessToggle}
                    />
                </Aux>
            )
        }
    }

    renderGuessContainer() {
        if (this.state.showGuess) {
            return (
                <Aux>
                    <Guess
                        personaId={this.props.id}
                        name={this.props.name}
                        closeGuess={this.showGuessToggle}
                        inputValue={this.getInputValue}
                        invalid={this.props.invalidId}
                    />                   
                </Aux>
            )
        }
    }

    render() {
		return (
            <Aux>
                {this.renderHintContainer()}

                {this.renderGuessContainer()}

                <Flip left>
                    <div className="card">
                        <div className="persona">
                            <img src="favicon.png" alt="" />
                            {
                                this.state.invalid ?
                                    <button className="disabled" type="button" disabled>Dicas</button>
                                :
                                    <button type="button" onClick={() => this.getPersonaDetails()} onMouseUp={this.showHintToggle}>Dicas</button>
                            }
                            {
                                this.state.invalid ?
                                    <button className="disabled" type="button" disabled>Responder</button>
                                :
                                    <button type="button" onMouseUp={this.showGuessToggle}>Responder</button>
                            }
                        </div>
                    </div>
                </Flip>
            </Aux>
		)
	}
}
