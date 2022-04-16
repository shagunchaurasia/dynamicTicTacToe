import React from "react";
import "./App.css";
import TicTacGame from "./components/ticTacGame/ticTacGame.component";
function App() {
  return (
    <div>
      {/* <TicTacGame numberProvided="3"></TicTacGame> */}
      <hr></hr>
      {/* <TicTacGame numberProvided="4"></TicTacGame> */}
      <hr></hr>
      <TicTacGame numberProvided="5"></TicTacGame>
    </div>
  );
}

export default App;
