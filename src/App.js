import './App.css';

import React, {useState} from 'react';
import Board from './Board';
import Moves from './Moves';

function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
    position: null,
    step: currentStep
  }]);
  const [order, setOrder] = useState('asc');

  let current = history.find(({step}) => step === currentStep);
  const {winner, squares: winSquares} = calculateWinner(current.squares) || {};
  const finished = current.squares.every(val => val !== null);
  
  let status;
  if (winner) {
    status = 'Выиграл ' + winner;
  } else if (finished) {
    status = 'Ничья!';
  } else {
    status = 'Следующий ход: ' + (xIsNext ? 'X' : 'O');
  }

  function handleClick(i) {
    const newHistory = history.filter(({step}) => step <= currentStep);
    const nextStep = newHistory.reduce((max, {step}) => max > step ? max : step, 0) + 1;
    
    current = newHistory.find(({step}) => step === currentStep);
    const squares = [...current.squares];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    if (order === 'asc') {
      setHistory([...newHistory, {
        squares,
        position: i,
        step: nextStep
      }]);
    } else {
      setHistory([{
        squares,
        position: i,
        step: nextStep
      }, ...newHistory]);
    }
    
    setXIsNext(!xIsNext);
    setCurrentStep(nextStep);
  }
  
  function jumpTo(step) {
    setCurrentStep(step);
    setXIsNext((step % 2) === 0);
  }
  
  function sort() {
    const newHistory = [...history];
    newHistory.sort((a, b) => order === 'desc' ? a.step - b.step : b.step - a.step );    
    setOrder(order === 'asc' ? 'desc' : 'asc');    
    setHistory(newHistory);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board  squares={current.squares}
                winSquares={winSquares}
                onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div className="game-info-header">
          <div>{status}</div>
          <button className="btn-sorting"
                  onClick={sort}
                  style={{visibility: (history.length > 1 ? 'visible' : 'hidden')}} >
            Сортировка {order === 'desc' ? '↑' : '↓'}
          </button>
        </div>
        <Moves history={history}
               currentStep={currentStep}
               jumpTo={jumpTo} />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        squares: lines[i]
      };
    }
  }
}

export default App;