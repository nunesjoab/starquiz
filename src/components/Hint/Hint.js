import React, { Component } from 'react'

// import axios from '../../axios'

import Fade from 'react-reveal/Fade'
import './Hint.css'

export default class Hint extends Component {

    render () {
        return (
            <div className="modal">
                <Fade left>
                    <div className="hint-container">
                        <h2 className="title">Detalhes</h2>
                            <ul>
                                <li><span>Cabelo:</span> {this.props.hair}</li>
                                <li><span>Altura:</span> {this.props.height} cm</li>
                                <li><span>Planeta:</span> {this.props.planet}</li>
                                <li><span>Filmes:</span> {this.props.films}</li>
                                <li><span>Veículos:</span> {this.props.vehicles}</li>
                            </ul>
                            <div className="button-container">
                                <button onClick={this.props.giveTry}>Responder</button>
                                <button onClick={this.props.closeHint}>Voltar</button>
                            </div>
                    </div>
                </Fade>
            </div>
        )
    }
}
