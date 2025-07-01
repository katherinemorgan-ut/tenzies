import './App.css'
import Die from './components/Die.jsx'
import RollButton from './components/RollButton.jsx';
import { useState } from 'react'
import { nanoid } from 'nanoid';

function App() {
  
  function getDiceObjects() {
    let values = new Array(10).fill(1);
    let valuesObject = values.map(x => ({
      value: Math.floor(Math.random()*7*x), 
      isHeld: false,
      id: nanoid()}));
    return valuesObject
  }


  let [ dieObjectArray, setdieObjectArray ] = useState(getDiceObjects())

  let diceElements = dieObjectArray.map( dieObject => < Die key={dieObject.id} dieValue={dieObject.value} />)
  
  function rollDice() {
    setdieObjectArray(getDiceObjects())
  }

  return (
    <main>
      <div className="flex-container">
        {diceElements}
      </div>
      <br></br>
      <br></br>
      <br></br>
      < RollButton onClick={rollDice} className="roll-dice" />
    </main>
  )
}

export default App
