import './Board.css';

import React from 'react';
import Square from './Square';
import {ROWS, COLS} from './const';


function Board({
  squares,
  onClick,
  winSquares = []}) {
  
  function renderSquare(i) {
    return (
      <Square key={i}
              value={squares[i]}
              win={winSquares.includes(i)}
              onClick={() => onClick(i)} />
    );
  }
  
  function renderRow(j) {
    return (
      <div key={j}
           className="board-row" >
        {Array(COLS).fill(0).map( (val, i) => renderSquare(j * ROWS + i) )}
      </div>
    );
  }

  return (
    <React.Fragment>
      {Array(ROWS).fill(0).map( (val, j) => renderRow(j) )}
    </React.Fragment>
  );
}

export default Board;