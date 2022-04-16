import React, { Component } from "react";
import Board from "../board/board.component";
import "./ticTacGame.style.scss";

class TicTacGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [
        {
          squares: Array(props.numberProvided * props.numberProvided).fill(
            null
          ),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go To Move # " + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = "Winner " + winner;
    } else {
      status = "Next Player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          ></Board>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>{moves}</div>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const linesBackup = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  var columnCombinations = [];
  function getColumns() {
    let dynamicValue = Math.sqrt(squares.length);
    for (let i = 0; i < dynamicValue; i++) {
      let innerValue = [];

      for (let j = 0; j < dynamicValue; j++) {
        innerValue.push(i + dynamicValue * j);
      }
      columnCombinations.push(innerValue);
    }
  }

  var rowCombinations = [];

  function getRows() {
    let dynamicValue = Math.sqrt(squares.length);
    for (let i = 0; i < dynamicValue; i++) {
      let innerValue = [];
      for (let j = 0; j < dynamicValue; j++) {
        innerValue.push(i * dynamicValue + j);
      }
      rowCombinations.push(innerValue);
    }
  }

  var diagonalCombinations = [];
  function getDiagonals() {
    let dynamicValue = Math.sqrt(squares.length);

    for (let i = 0; i < dynamicValue; i++) {
      let innerValue = [];
      for (let j = 0; j < dynamicValue; j++) {
        innerValue.push(dynamicValue * j + j);
      }
      diagonalCombinations.push(innerValue);
      break;
    }
  }

  var invertedDiagonalCombinations = [];
  function getInvertedDiagonals() {
    let dynamicValue = Math.sqrt(squares.length);

    for (let i = 0; i < dynamicValue; i++) {
      let innerValue = [];
      for (let j = 1; j <= dynamicValue; j++) {
        innerValue.push((dynamicValue - 1) * j);
      }
      invertedDiagonalCombinations.push(innerValue);
      break;
    }
  }

  getColumns();
  getRows();
  getDiagonals();
  getInvertedDiagonals();
  let finalCombinations = columnCombinations
    .concat(rowCombinations)
    .concat(diagonalCombinations)
    .concat(invertedDiagonalCombinations);
  let lines = finalCombinations;

  console.log("All possible combinations");
  console.log(lines);
  // getRows();
  // let returnValue = false;

  // for (let i = 0; i < lines.length; i++) {
  //   let [a, ...b] = lines[i];
  //   console.log("Calculating");
  //   if (squares[a]) {
  //     for (let j = 0; j < b.length; b++) {
  //       console.log("Testing");
  //       console.log(squares[a]);

  //       console.log(squares[b[j]]);

  //       returnValue = squares[a] === squares[b[j]] ? true : false;
  //       console.log("Inside return Value");
  //       console.log(returnValue);
  //       if (returnValue) {
  //         continue;
  //       } else {
  //         return null;
  //       }
  //     }
  //     console.log("Final return Value");
  //     console.log(returnValue);
  //   }
  //   if (squares[a] && returnValue) {
  //     return squares[a];
  //   }
  // }

  // return null;

  for (let i = 0; i < lines.length; i++) {
    const [...a] = lines[i];
    // if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
    //   return squares[a];
    // }
    console.log(a);
    const allEqual = (a) => a.every((v) => squares[v] === squares[a[0]]);
    console.log(allEqual(a));
    if (allEqual(a) === true) {
      return squares[a[0]];
    }
  }
  return null;
}

export default TicTacGame;
