import React, { Component } from "react";
import Square from "../square/square.component";
import "./board.style.scss";

class Board extends Component {
  constructor(props) {
    super(props);
    console.log("Here inside board");
    console.log(props);
    console.log(Math.sqrt(parseInt(props.squares.length)));
  }
  renderSquare = (i) => {
    if (i === 0 || i % Math.sqrt(parseInt(this.props.squares.length)) === 0) {
      return (
        <div style={{ display: "block", clear: "both", float: "left" }}>
          <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
          />
        </div>
      );
    } else {
      return (
        <div style={{ display: "inline-block", float: "left" }}>
          <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
          />
        </div>
      );
    }
  };
  render() {
    return (
      <div>
        {this.props.squares.map((square, index) => {
          return <span key={index}>{this.renderSquare(index)}</span>;
        })}
      </div>
    );
  }
}

export default Board;
