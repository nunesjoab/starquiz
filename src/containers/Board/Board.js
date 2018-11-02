import React, {Component} from 'react'

import axios from '../../axios'
import './Board.css'

import Persona from '../../components/Persona/Persona'
import Aux from '../../hoc/Auxiliar/Auxiliar'
//import Modal from '../../components/UI/Modal/Modal';

class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            people: [],
            selectedPersonaId: null,
            nextPage: null,
            previousPage: null,
            showModal: false,
            clickedId: null,
            //showHints: null,
            //takeShot: null

        }
    }

    componentDidMount() {
        axios.get('people/')
        .then(response => {
            const nextPage = response.data.next
            const previousPage = response.data.previous
            let people = response.data.results.map((element, index) => {
                element.id = index+1
                return {
                    ...element
                }
            })
            // console.log(people)
            this.setState({
                people,
                nextPage,
                previousPage
            })
        })
    }
    
    getPreviousPeopleHandler = (page) => {
        if (this.state.previousPage) {
            axios.get(this.state.previousPage)
                .then(response => {
                    const nextPage = response.data.next
                    const previousPage = response.data.previous
                    let people = response.data.results.map((element, index) => {
                        element.id = index + 1
                        return {
                            ...element
                        }
                    })
                    // console.log(people)
                    this.setState({
                        people,
                        nextPage,
                        previousPage
                    })
                })
        }
        // console.log('next')
    }

    getNextPeopleHandler = () => {
        if (this.state.nextPage) {
            axios.get(this.state.nextPage)
            .then(response => {
                const nextPage = response.data.next
                const previousPage = response.data.previous
                let people = response.data.results.map((element, index) => {
                    element.id = index + 1
                    return {
                        ...element
                    }
                })
                // console.log(people)
                this.setState({
                    people,
                    nextPage,
                    previousPage
                })
            })
        }
        // console.log('next')
    }

    showHintModalHandler = () => {
        console.log('SHOW HINT MODALL')
        this.setState({ showModal: true })
    }

    showGuessModalHandler = () => {
        console.log('SHOW GUESS MODALL')
        this.setState({ showModal: true })
    }

    renderPeople() {
        let people = <p style={{ textAlign: 'center' }}>Something got wrong!!</p>

        if (this.state.people) {
            people = this.state.people.map(persona => {
                return (
                    < Persona
                        key={persona.id}
                        id={persona.id}
                        name={persona.name}
                        showHintModal={this.showHintModalHandler}
                        showGuessModal={this.showGuessModalHandler}
                    />
                )
            })
        }

        return people
    }

    render () {
        return (
            <Aux>
                
                <div className="container">
                    <h1 className="title">Characters</h1>
                    
                    <section className="characters">
                        {this.renderPeople()}
                    </section>

                    <button onClick={this.getPreviousPeopleHandler} className={!this.state.previousPage ? 'disabled' : ''}>Previous Page</button>
                    <button onClick={this.getNextPeopleHandler} className={!this.state.nextPage ? 'disabled' : ''}>Next Page</button>
                </div>
            </Aux>
        )
    }
}

export default Board
