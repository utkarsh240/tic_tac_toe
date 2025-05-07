import { useState, useEffect } from 'react';

export default function TicTacToe() {
  const N = 5;
  const M = 4;

  const [board, setBoard] = useState(Array(N).fill().map(() => Array(N).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameStatus, setGameStatus] = useState('Player X\'s turn');
  const [gameOver, setGameOver] = useState(false);

  const handleCellClick = (row, col) => {
    if (board[row][col] || gameOver) return;

    const newBoard = board.map(row => [...row]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    if (checkWinner(newBoard, row, col)) {
      setGameStatus(`Player ${currentPlayer} wins!`);
      setGameOver(true);
      return;
    }

    if (checkDraw(newBoard)) {
      setGameStatus('Game ended in a draw!');
      setGameOver(true);
      return;
    }

    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
    setCurrentPlayer(nextPlayer);
    setGameStatus(`Player ${nextPlayer}'s turn`);
  };

  const resetGame = () => {
    setBoard(Array(N).fill().map(() => Array(N).fill(null)));
    setCurrentPlayer('X');
    setGameStatus('Player X\'s turn');
    setGameOver(false);
  };

  const checkWinner = (board, row, col) => {
    const directions = [
      { dr: 0, dc: 1 },
      { dr: 1, dc: 0 },
      { dr: 1, dc: 1 },
      { dr: 1, dc: -1 },
    ];

    const player = board[row][col];

    for (const { dr, dc } of directions) {
      let count = 1;

      for (let i = 1; i < M; i++) {
        const newRow = row + dr * i;
        const newCol = col + dc * i;
        
        if (
          newRow >= 0 && newRow < N &&
          newCol >= 0 && newCol < N &&
          board[newRow][newCol] === player
        ) {
          count++;
        } else {
          break;
        }
      }

      for (let i = 1; i < M; i++) {
        const newRow = row - dr * i;
        const newCol = col - dc * i;
        
        if (
          newRow >= 0 && newRow < N &&
          newCol >= 0 && newCol < N &&
          board[newRow][newCol] === player
        ) {
          count++;
        } else {
          break;
        }
      }

      if (count >= M) {
        return true;
      }
    }

    return false;
  };

  const checkDraw = (board) => {
    return board.every(row => row.every(cell => cell !== null));
  };
  
  const Cell = ({ value, onClick }) => {
    return (
      <button 
        onClick={onClick}
        className={`w-12 h-12 border border-gray-400 flex items-center justify-center text-2xl font-bold
          ${value === 'X' ? 'text-blue-600' : value === 'O' ? 'text-red-600' : ''}`}
      >
        {value}
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Tic-Tac-Toe</h1>
      
      <div className="mb-4 text-xl font-semibold">{gameStatus}</div>
      
      <div className="mb-6">
        <div className="grid gap-0">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((cell, colIndex) => (
                <Cell 
                  key={`${rowIndex}-${colIndex}`}
                  value={cell}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col space-y-4">
        <button 
          onClick={resetGame}
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded font-medium"
        >
          Reset
        </button>
        
        <div className="text-sm text-gray-600 mt-4">
          <p>Board Size: {N}×{N}</p>
          <p>Need {M} in a row to win</p>
        </div>
      </div>
    </div>
  );
}
