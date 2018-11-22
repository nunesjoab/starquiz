import React, {Component} from 'react'

import axios from '../../axios'

import Persona from '../../components/Persona/Persona'
import Aux from '../../hoc/Auxiliar/Auxiliar'
import Score from '../../components/Score/Score'
import FrontPage from '../../components/FrontPage/FrontPage'

import './Board.css'

class Board extends Component {
    constructor(props) {
        super(props)
        this.startTimer = this.startTimer.bind(this)

        this.state = {
            playGame: false,
            playerId: 0, 
            time: 0,
            people: [],
            selectedPersonaId: null,
            nextPage: null,
            previousPage: null,
            clickedId: null,
            invalidPersona: [],
        }
    }

    componentDidMount() {
        localStorage.clear()
        const score = { 'points': 0 }

        localStorage.setItem(this.state.playerId, JSON.stringify(score))

        axios.get('people/')
        .then(response => {
            const nextPage = response.data.next
            const previousPage = response.data.previous

            let people = response.data.results.map(element => {
                element.id = element.url.split('/')[5]
                return {
                    ...element
                }
            })

            this.setState({
                people,
                nextPage,
                previousPage
            })
        })
    }

    startGame = () => {
        this.setState((prevState) => {
            return {
                playGame: !prevState.playGame,
            }
        })
    }

    restartGame = () => {

        this.setState((prevState) => {
            return {
                playGame: !prevState.playGame,
                playerId: prevState.playerId + 1,
                invalidPersona: []
            }
        })
    }

    startTimer = () => {
        this.setState({ time: 20 })

        clearInterval(this.timer)

        this.timer = setInterval(() => this.setState((prevState) => {
            return { time: prevState.time - 1 }
        }), 1000)
    }

    setInvalidId = (value) => {
        let invalidPersona = this.state.invalidPersona.slice()
        invalidPersona.push(value)
        if (!this.state.invalidPersona.includes(value)) {
            this.setState({ invalidPersona })
        }
    }

    getPeopleHandler = (anotherPage) => {
        axios.get(anotherPage)
        .then(response => {
            const nextPage = response.data.next
            const previousPage = response.data.previous
            let people = response.data.results.map(element => {
                element.id = element.url.split('/')[5]
                return {
                    ...element
                }
            })
            //console.log(people)

            this.setState({
                people,
                nextPage,
                previousPage
            })
        })
    }
    
    renderPeople() {
        let people = <p style={{ textAlign: 'center' }}>Something got wrong!!</p>

        if (this.state.people) {
            people = this.state.people.map((persona, index) => {
                if (!this.state.invalidPersona.includes( persona.id ) ) {
                    return (
                        < Persona
                            key={persona.id}
                            player={this.state.playerId}
                            id={persona.id}
                            name={persona.name.toLowerCase()}
                            hair={persona.hair_color}
                            height={persona.height}
                            planetUrl={persona.homeworld}
                            filmsArray={persona.films}
                            vehiclesArray={persona.vehicles}
                            invalidId={this.setInvalidId}
                            negate={false}
                        />
                    )
                } else {
                    return (
                        < Persona
                            key={persona.id}
                            player={this.state.playerId}
                            id={persona.id}
                            name={persona.name.toLowerCase()}
                            hair={persona.hair_color}
                            height={persona.height}
                            planetUrl={persona.homeworld}
                            filmsArray={persona.films}
                            vehiclesArray={persona.vehicles}
                            invalidId={this.setInvalidId}
                            negate={true}
                        />
                    )
                }
            })
        }

        return people
    }

    render () {
        if (!this.state.playGame) {
            return (
                <Aux>
                    <FrontPage
                        startGame={this.startGame}
                        startTimer={this.startTimer}
                    />
                </Aux>
            )
        } else {
            if (this.state.time > 0) {
                return (
                    <Aux>                    
                        <div className="container board">
                            <h1 className="title">Personagens</h1>
                            
                            <section className="characters">
                                {this.renderPeople()}
                            </section>

                            <div className="timer-wrapper">
                                <span>
                                    {
                                        "0" + Math.floor(this.state.time / 60)
                                    }
                                </span>
                                :
                                <span>
                                    {
                                        Math.floor(this.state.time % 60) < 10 ? "0" + Math.floor(this.state.time % 60) : Math.floor(this.state.time % 60)
                                    }
                                </span>
                            </div>
                            {
                                this.state.previousPage ?
                                    <button onClick={() => this.getPeopleHandler(this.state.previousPage)} >
                                        Anterior
                                    </button>
                                    :
                                    <button className="disabled" disabled>
                                        Anterior
                                    </button>
                            }
                            {
                                this.state.nextPage ?
                                    <button onClick={() => this.getPeopleHandler(this.state.nextPage)} >
                                        Próxima
                                    </button>
                                    :
                                    <button className="disabled" disabled>
                                        Próxima
                                    </button>
                            }
                        </div>
                    </Aux>
                )
            } else {
                clearInterval(this.timer)

                return (
                    <Aux>
                        <Score
                            restartGame={this.restartGame}
                            player={this.state.playerId}
                        />
                    </Aux>
                )
            }
        }
    }
}

export default Board

