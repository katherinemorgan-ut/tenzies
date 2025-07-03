function RollButton(props) {
    return <button type="button" onClick={props.onClick} ref={props.buttonRef}>
    {props.gameWon ? "New Game" : "Roll" }
    </button>
}

export default RollButton