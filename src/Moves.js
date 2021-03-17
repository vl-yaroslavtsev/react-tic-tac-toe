import {ROWS, COLS} from './const';

function Moves({
  history, 
  currentStep, 
  jumpTo}) {
  const moves = history.map(({position, step}, move) => {
    const col = Math.floor(position / COLS) + 1;
    const row = position % ROWS + 1;
    const desc = step ?
      `Перейти к ходу #${step}, столбец: ${row}, строка: ${col}` :
      'К началу игры';
    return (
      <li key={step} >
        <button className={currentStep === step ? "btn-current-move" : ""}
                onClick={() => jumpTo(step)}>
          {desc}
        </button>
      </li>
    );
  }); 
  
  return (
    <ol>{moves}</ol>
  );
}

export default Moves;