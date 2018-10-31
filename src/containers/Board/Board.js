import React, {Component} from 'react'

import axios from '../../axios'

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
            <div>
                <h3>BOARD</h3>
            </div>
        )
    }
}

export default Board
