import { useState } from 'react'
import './App.css'

function App() {
  
  const generateBoard = (size: number) => {
    const newBoard = []
    for (let i=0; i<size; i++){
      newBoard.push([...Array(size)])
    }
    return newBoard
  }
  const [board, setBoard] = useState(generateBoard(3))
  const [palyer, setPlayer] = useState('X')

  const horizontalWin = (board: []) => {
    for (const row of board){
      const checkBoard = new Set(row) 
      if (checkBoard.size === 1 && !checkBoard.has(undefined))
        return true
    }
  }
  const verticalWin = (board: []) => {
    const newBoard = []
    let col = 0
    while (col < board.length) {
      const newRow:[] = []
      for (let row = 0; row < board.length; row++) {
        newRow.push(board[row][col])
      }
      newBoard.push(newRow)
      col++
    }
    return newBoard
  }

  const diagonalWin = (board: [] ) => {
    const newBoard = [[], []]
    let increment = 0
    let decrement = board.length - 1
    while (increment < board.length) {
      newBoard[0].push(board[increment][increment])
      newBoard[1].push(board[increment][decrement])
      increment++
      decrement--
    }
    return newBoard
  }

  const winner = (board: [] ) => {
    if (horizontalWin(board)) {
      return true
    }
    if (horizontalWin(verticalWin(board))) {
      return true
    }
    if (horizontalWin(diagonalWin(board))) {
      return true
    }
  }

  const handleClick = (row:number, cell:number) => {
      board[row][cell] = palyer
      setBoard([...board])
      if (winner(board)){
        console.log(`${palyer} WON`);
        setBoard(generateBoard(3))
        setPlayer('X')
      } else {
        setPlayer(palyer === 'X' ? 'O' : 'X')
      }
  }

  return (
    <>
      <div>
        {board.map((row, rowIdx) => (
          <div className='row' key={rowIdx}>{row.map((cell, cellIdx) => (
            <div className='cell' key={cellIdx} onClick={()=>handleClick(rowIdx, cellIdx)}>{cell}</div>
          ))}</div>
        ))}
      </div>
    </>
  )
}

export default App
