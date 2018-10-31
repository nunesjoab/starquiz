import React from 'react'

import './Persona.css'

const Persona = (props) => {
  return (
	<div className="card">
		<div className="persona">
			  <img src="http://placehold.it/250x200" alt="" />
			<h3>Nome</h3>
			<ul>
				<li>Prop 1</li>
				<li>Prop 2</li>
				<li>Prop 3</li>
				<li>Prop 4</li>
				<li>Prop 5</li>
			</ul>
		</div>
	</div>
  )
}

export default Persona
