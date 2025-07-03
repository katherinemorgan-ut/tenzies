function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return <button 
    style={styles} 
    onClick={() => props.holdFunction(props.id)} 
    aria-label={`Die with a value of ${props.value}, ${props.isHeld ? "held" : "not held"}`}
    aria-pressed={props.isHeld}
    
    >
        {props.dieValue}
    </button>
}

export default Die