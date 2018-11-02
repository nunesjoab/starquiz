import React, {Component} from 'react'

import './Persona.css'
import Aux from '../../hoc/Auxiliar/Auxiliar'
import Hint from '../Hint/Hint';


export default class Persona extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clickedId: this.props.id,
            showHint: false
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.showHint !== this.state.showHint
    }

    showHintHandler = () => {
        this.setState({ showHint: true })
    }


    closeHintHandler = () => {
        this.setState({ showHint: false })
    }

    renderHintContainer() {
        if (this.state.showHint) {
            return (
                <Aux>
                    <Hint
                        personaId={this.props.id}
                        closeHint={this.closeHintHandler}
                    />
                </Aux>
            )
        }
    }

    render() {
		return (
        <Aux>
            {this.renderHintContainer()}
            <div className="card">
                <div className="persona">
                    <img src="http://placehold.it/250x200" alt="" />
                    <h2>{this.props.name}</h2>
                        <button type="button" onMouseUp={this.showHintHandler} onClick={this.props.showHintModal}>Dicas</button>
                    <button type="button" onClick={this.props.showGuessModal}>Responder</button>
                </div>
            </div>
        </Aux>
		)
	}
}
