import { useState } from 'react'
import './App.css'

import { Square } from './components/Square'
import { TURNS } from './constatns';
import { checkWinnerFrom, checkEndGame } from './logic/board';
import { WinnerModal } from './components/WinnerModal';
import { saveGameToStore, resetGameStorage } from './localStorage';
import confetti from 'canvas-confetti'



function App() {
  // Estados "useState"
  // Este estado es el tablero y para actualizarlo
  const tablero = Array(9).fill(null); 

  const [board,setBoard] = useState(()=>{
    const boardFromStrorage = window.localStorage.getItem('board');
    if (boardFromStrorage)return JSON.parse(boardFromStrorage)
    return tablero
  });

  // Este estado es para poder cambiar los turnos
  const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X
  });

  // Este estado es para poder ver al ganador
  const [winner, setWinner] = useState(null);
// -----------------------------------------------------------------

  // Funcion para ver el ganador

  
  // Reiniciar Juego
  const resetGame = () =>{
    setBoard(tablero);
    setWinner(null);
    setTurn(TURNS.X)

    resetGameStorage()
  }

  // Funcion para actualizar el board

  const updateBoard = (index) =>{
    // Si hay una x/o en el index no hacer nada
    if (board[index] || winner) return;

    // Copiamos el tablero y lo actualizamos con el turno en el index
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // Aca vamos cambiando los turnos
    //turn el turno actual
    //si el turno actual es X, entonces le toca la O
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    // y aca cambiamos el estado del turno
    setTurn(newTurn);

    saveGameToStore({
      board: newBoard,
      turn: newTurn
    })

    // revisamos si hay un ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti()
      setWinner(newWinner);
    }
    else if(checkEndGame(newBoard)){
      setWinner(false);
    }
  }
  return (
    <main className='board'>
      <h1>Ta Te Ti</h1>
      <button onClick={resetGame}>Reiniciar juego</button>
      <section className='game'>
        {
          board.map((square,index) =>{
            return(
              <Square 
              key ={index} 
              index ={index}
              updateBoard ={updateBoard}>
              
              {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}
export default App
