import React from 'react'

import './Persona.css'

export default (props) => {
  return (
	<div className="card">
		<div className="persona">
			  <img src="http://placehold.it/250x200" alt="" />
				<h2>{props.name}</h2>
			<button type="button">Responder</button>
			<button type="button">Dicas</button>
		</div>
	</div>
  )
}

