import React, {Component} from 'react'

import axios from '../../axios'
import './Board.css'

import Persona from '../../components/Persona/Persona';

class Board extends Component {
    state = {
        people: []
    }

    componentDidMount() {
        axios.get('people/')
        .then(response => {
            //console.log(response.data)
            const people = response.data.results.map(people => {
                return {
                    ...people
                }
            })
            this.setState({ people })
            console.log(people)
        })
    }

    render () {
        return (
            <div className="container">
                <h3>Characters</h3>
                
                <section className="characters">
                    <Persona />
                    <Persona />
                    <Persona />
                    <Persona />
                </section>
            </div>
        )
    }
}

export default Board
