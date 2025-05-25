import React from 'react';
import { useNavigate } from 'react-router-dom';

function InitialPage() {
  const navigate = useNavigate();

  const handleOptionClick = (path) => {
    navigate(path);
  };

  return (
    <div className="initial-page">
      <h1>Chess Playground</h1>
      <div className="options-container">
        <div className="option-card" onClick={() => handleOptionClick('/play')}>
          <h2>Play Against Engine</h2>
          <p>Challenge the chess engine</p>
        </div>
        <div className="option-card" onClick={() => handleOptionClick('/rating')}>
          <h2>Calculate Rating</h2>
          <p>Analyze your games and calculate your rating</p>
        </div>
        <div className="option-card" onClick={() => handleOptionClick('/engine-match')}>
          <h2>Engine Matches</h2>
          <p>Watch engine vs engine matches</p>
        </div>
      </div>
    </div>
  );
}

export default InitialPage;
