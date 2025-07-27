import { WINNER_COMBOS } from "../constatns";

export const checkWinnerFrom = (boardToCheck) =>{
    for (const combo of WINNER_COMBOS){
      const [a,b,c] = combo;
      if(
        boardToCheck[a] &&
        boardToCheck[a]===boardToCheck[b] &&
        boardToCheck[a]===boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    return null
  }

// Funcion para ver si hay empate
  export const checkEndGame =(newBoard) =>{
      return newBoard.every((square) => square !== null)
    }