import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  let square_style = 'square blue';
  props.value==='X' ? square_style = 'square blue' : square_style = 'square red';
  return (
    <button className={square_style} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Status(props){
  return (
    <div className={props.clas}>{props.status}</div>
    );
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }

  handleClick(i){
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({squares: squares, xIsNext: !this.state.xIsNext});
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let stat_style = 'status blue';
    let status;

    this.state.xIsNext ? stat_style = 'status blue' : stat_style = 'status red';

    if (winner) {
      if(winner==='TIE'){
        status = winner;
        stat_style = 'status yellow';
      } else {
        status = 'Winner: ' + winner;
        stat_style = 'status green';
      }
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
    <div>
      <Status clas={stat_style} status={status}/>
      <div className="game">
        <div className="game-board">
          <div>
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
        </div>
      </div>
      <button className='btn' onClick={() => {window.location.reload(false)}}>RESET</button>
    </div>
    );
  }
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
  for (let i of lines) {
    const [a, b, c] = i;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  for(let i of squares){
    if(i == null){
      return null;
    }
  }
  return 'TIE';
}

// ===============================================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Board />);