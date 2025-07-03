import './App.css'
import Die from './components/Die.jsx'
import RollButton from './components/RollButton.jsx';
import { useState, useEffect, useRef } from 'react'
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'

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


  let [ dieObjectArray, setdieObjectArray ] = useState(() => getDiceObjects())
  const endgameButtonRef = useRef(null);

  let gameWon = 
    dieObjectArray.every( die => die.isHeld) &&
    dieObjectArray.every( die => die.value === dieObjectArray[0].value);

  let diceElements = dieObjectArray.map( dieObject => < Die 
    key={dieObject.id} 
    holdFunction={hold} 
    dieValue={dieObject.value} 
    isHeld={dieObject.isHeld}
    id={dieObject.id}
    />)

  
  function rollDice() {
    // If user has won the game, reset the dice & the gameWon variable
    if(gameWon) {
      setdieObjectArray(getDiceObjects());
      gameWon = false;
    }
    else {
    setdieObjectArray( prevDieObjectArray => prevDieObjectArray.map( 
      die => (
        die.isHeld == true ?
        {...die} :
        {...die, value: Math.floor(Math.random()*7)})
    ))
  }
  }

  useEffect( () => {
    if (gameWon) {
      endgameButtonRef.current.focus();
    }

  }, [gameWon])

  return (
    <main>
      { gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
          {gameWon && <p>Congratulations! You won. Press "New Game" to play again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="flex-container">
        {diceElements}
      </div>
      <br></br>
      <br></br>
      <br></br>
      < RollButton onClick={rollDice} className="roll-dice" gameWon={gameWon} buttonRef={endgameButtonRef}/>
    </main>
  )
}

export default App
