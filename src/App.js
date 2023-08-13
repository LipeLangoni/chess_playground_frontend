import { useState } from "react";
import Chess from "chess.js";
import { Chessboard } from "react-chessboard";
import "./App.css"; 
import React, { useEffect } from 'react';
import axios from 'axios';//

function App(){
  const [game, setGame] = useState(new Chess());

  async function getMovedj() {
    const moves = game.history();
    const lastMove = moves[moves.length - 1];

    const data = { uci_move: lastMove};
    try {
      const response = await axios.post('http://127.0.0.1:8000/make_move/', data);
      console.log(response.data);
      const uci = response.data.engine_move;
      console.log(uci);
      
      const fr = uci.slice(0, 2);
      const to_ = uci.slice(-2); 
      const final_move = {from:fr,to:to_}
      makeAMove(final_move);
    } catch (error) {
      console.error(error);

    }
  }

  

  function makeAMove(move) {
    console.log(move)
    const gameCopy = { ...game };
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result; 
  }

  function resetBoard() {
    setGame(new Chess());
    axios.post('http://127.0.0.1:8000/reset_board/')
      .then(response => {
        console.log(response.data)
      
      })
      .catch(error => {
        console.error(error);
        
      });
  }

  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    

    // illegal move
    if (move === null) return false;
    setTimeout(getMovedj, 200);
    return true;
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '20vh',
    }}>
      <h1>Prodigy</h1>
      <div className="chessboard-container">
        <Chessboard position={game.fen()} onPieceDrop={onDrop} />
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
      <button className="reset-button" onClick={resetBoard}>Resetar jogo</button>
    </div>
    </div>
  );
}

export default App;