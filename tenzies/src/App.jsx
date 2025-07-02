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

  function hold(id) {
   setdieObjectArray( prevDieObjectArray => 
    (prevDieObjectArray.map( die => 
      (die.id == id 
        ? {...die, isHeld:!die.isHeld} 
        : {...die}))))
  }


  let [ dieObjectArray, setdieObjectArray ] = useState(getDiceObjects())

  let diceElements = dieObjectArray.map( dieObject => < Die 
    key={dieObject.id} 
    holdFunction={hold} 
    dieValue={dieObject.value} 
    isHeld={dieObject.isHeld}
    id={dieObject.id}
    />)

  
  function rollDice() {
    setdieObjectArray( prevDieObjectArray => prevDieObjectArray.map( 
      die => (
        die.isHeld == true ?
        {...die} :
        {...die, value: Math.floor(Math.random()*7)})
    ))
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
