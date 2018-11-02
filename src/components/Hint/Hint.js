import React, { Component } from 'react'

import './Hint.css'

export default class Hint extends Component {

    render() {
        return (
            <div className="modal">
                <div className="hint-container">
                    <h2>Dicas</h2>
                    <div>
                        <ul>
                            <li>{this.props.personaId}</li>
                            <li>Info</li>
                            <li>Info</li>
                            <li>Info</li>
                            <li>Info</li>
                        </ul>
                        <button >Responder</button>
                        <button onClick={this.props.closeHint}>Voltar</button>
                    </div>
                </div>
            </div>
        )
    }
}
