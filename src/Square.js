import './Square.css';

function Square({
  value,
  onClick,
  win
}) {
  return (
    <button className={"square" + (win ? " square-win" : "")}
            onClick={onClick} >
      {value}
    </button>
  );
}

export default Square;