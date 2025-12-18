import React, { useState, useRef } from 'react'
import './TicTacToe.css'
import circle_icon from '../assets/circle.png'
import cross_icon from '../assets/cross.png'

export const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""))
  const [isXTurn, setIsXTurn] = useState(true)
  const [lock, setLock] = useState(false)
  const titleRef = useRef(null)

  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ]

  const handleClick = (index) => {
    if (board[index] !== "" || lock) return

    const newBoard = [...board]
    newBoard[index] = isXTurn ? "x" : "o"
    setBoard(newBoard)
    setIsXTurn(!isXTurn)
    checkWin(newBoard)
  }

  const checkWin = (board) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        won(board[a])
        return
      }
    }
  }

   const won = (winner) => {
    setLock(true)
    titleRef.current.innerHTML =
      `Congratulations!! <img src=${winner === "x" ? cross_icon : circle_icon} /> Wins`
  }

  const resetGame = () => {
    setBoard(Array(9).fill(""))
    setIsXTurn(true)
    setLock(false)
    titleRef.current.innerHTML = 'Tic Tac Toe Game in <span>WEB</span>'
  }

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        Tic Tac Toe Game in <span>WEB</span>
      </h1>

      <div className="board">
        {board.map((value, index) => (
          <div key={index} className="boxes" onClick={() => handleClick(index)}>
            {value === "x" && <img src={cross_icon} />}
            {value === "o" && <img src={circle_icon} />}
          </div>
        ))}
      </div>

      <button className="reset" onClick={resetGame}>Reset</button>
    </div>
  )
}