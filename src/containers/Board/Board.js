<<<<<<< HEAD
import React, {Component} from 'react'

import axios from '../../axios'

import Persona from '../../components/Persona/Persona'
import Aux from '../../hoc/Auxiliar/Auxiliar'

import './Board.css'

class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            people: [],
            selectedPersonaId: null,
            nextPage: null,
            previousPage: null,
            playGame: false,
            clickedId: null,
            invalidPersona: [],

        }
    }

    componentDidMount() {
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
        this.setState({
            playGame: true
        })
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
                                onClick={this.startGame}
                            >
                                Jogar
                            </button>
                        </div>
                    </div>
                </Aux>
            )
        } else {
            return (
                <Aux>                    
                    <div className="container">
                        <h1 className="title">Personagens</h1>
                        
                        <section className="characters">
                            {this.renderPeople()}
                        </section>

                        <button onClick={() => this.getPeopleHandler(this.state.previousPage)} className={!this.state.previousPage ? 'disabled' : ''}>Anterior</button>
                        <button onClick={() => this.getPeopleHandler(this.state.nextPage)} className={!this.state.nextPage ? 'disabled' : ''}>Próxima</button>
                    </div>
                </Aux>
            )
        }
    }
}

export default Board

