import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chess from "chess.js";
import { Chessboard } from "react-chessboard";
import "./App.css"; 
import React, { useEffect } from 'react';
import axios from 'axios';
import InitialPage from './components/InitialPage';
import './components/InitialPage.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/play" element={<ChessBoardPage />} />
        <Route path="/rating" element={<h1>Rating Page (coming soon)</h1>} />
        <Route path="/engine-match" element={<h1>Engine Match Page (coming soon)</h1>} />
      </Routes>
    </Router>
  );
}

function ChessBoardPage() {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState('');
  const [move, setMove] = useState('');
  const [pgn, setPgn] = useState('');
  const [isWhite, setIsWhite] = useState(true);
  const [isBlack, setIsBlack] = useState(false);
  const [isBoth, setIsBoth] = useState(false);
  const [isEngine, setIsEngine] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const [isWhiteEngine, setIsWhiteEngine] = useState(false);
  const [isBlackEngine, setIsBlackEngine] = useState(false);
  const [isWhiteHuman, setIsWhiteHuman] = useState(false);
  const [isBlackHuman, setIsBlackHuman] = useState(false);

  async function getMovedj() {
    const moves = game.history();
    const lastMove = moves[moves.length - 1];

    const data = { uci_move: lastMove};
    try {
      const response = await axios.post('/make_move/', data);
      console.log(response.data);
      const uci = response.data.data.engine_move;
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
    axios.post('/reset_board/')
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