import React, {Component} from 'react'

import axios from '../../axios'
import './Board.css'

class Board extends Component {
    state = {
        people: []
    }

    componentDidMount() {
        axios.get('people/')
        .then(response => {
            console.log(response.data)
        })
    }

    render () {
        return (
            <div className="container">
                <section className="characters">
                    <h3>Characters</h3>
                </section>
            </div>
        )
    }
}

export default Board
