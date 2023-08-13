import { useState } from "react";
import Chess from "chess.js";
import { Chessboard } from "react-chessboard";
import "./App.css"; // import your custom CSS file

function App(){
  const [game, setGame] = useState(new Chess());

  function makeAMove(move) {
    const gameCopy = { ...game };
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  function PieceSquareTable2(){

    function squareToIndex(square) {
      var file = square.charCodeAt(0) - 97; // 'a' has char code 97
      var rank = 8 - parseInt(square.charAt(1));
      return rank * 8 + file;
    }

    const pawntable = [
      [ 100, 100, 100, 100, 105, 100, 100,  100],
            [  78,  83,  86,  73, 102,  82,  85,  90],
            [   7,  29,  21,  44,  40,  31,  44,   7],
            [ -17,  16,  -2,  15,  14,   0,  15, -13],
            [ -26,   3,  10,   9,   6,   1,   0, -23],
            [ -22,   9,   5, -11, -10,  -2,   3, -19],
            [ -31,   8,  -7, -37, -36, -14,   3, -31],
            [   0,   0,   0,   0,   0,   0,   0,   0]]

    const knightstable = [[-66, -53, -75, -75, -10, -55, -58, -70],
    [ -3,  -6, 100, -36,   4,  62,  -4, -14],
    [ 10,  67,   1,  74,  73,  27,  62,  -2],
    [ 24,  24,  45,  37,  33,  41,  25,  17],
    [ -1,   5,  31,  21,  22,  35,   2,   0],
    [-18,  10,  13,  22,  18,  15,  11, -14],
    [-23, -15,   2,   0,   2,   0, -23, -20],
    [-74, -23, -26, -24, -19, -35, -22, -69]]

    const bishopstable = [[-59, -78, -82, -76, -23,-107, -37, -50],
    [-11,  20,  35, -42, -39,  31,   2, -22],
    [ -9,  39, -32,  41,  52, -10,  28, -14],
    [ 25,  17,  20,  34,  26,  25,  15,  10],
    [ 13,  10,  17,  23,  17,  16,   0,   7],
    [ 14,  25,  24,  15,   8,  25,  20,  15],
    [ 19,  20,  11,   6,   7,   6,  20,  16],
    [ -7,   2, -15, -12, -14, -15, -10, -10]]

    const rookstable = [[ 35,  29,  33,   4,  37,  33,  56,  50],
    [ 55,  29,  56,  67,  55,  62,  34,  60],
    [ 19,  35,  28,  33,  45,  27,  25,  15],
    [  0,   5,  16,  13,  18,  -4,  -9,  -6],
    [-28, -35, -16, -21, -13, -29, -46, -30],
    [-42, -28, -42, -25, -25, -35, -26, -46],
    [-53, -38, -31, -26, -29, -43, -44, -53],
    [-30, -24, -18,   5,  -2, -18, -31, -32]]

    const queenstable = [[  6,   1,  -8,-104,  69,  24,  88,  26],
    [ 14,  32,  60, -10,  20,  76,  57,  24],
    [ -2,  43,  32,  60,  72,  63,  43,   2],
    [  1, -16,  22,  17,  25,  20, -13,  -6],
    [-14, -15,  -2,  -5,  -1, -10, -20, -22],
    [-30,  -6, -13, -11, -16, -11, -16, -27],
    [-36, -18,   0, -19, -15, -15, -21, -38],
    [-39, -30, -31, -13, -31, -36, -34, -42]]

    const kingstable = [[  4,  54,  47, -99, -99,  60,  83, -62],
    [-32,  10,  55,  56,  56,  55,  10,   3],
    [-62,  12, -57,  44, -67,  28,  37, -31],
    [-55,  50,  11,  -4, -19,  13,   0, -49],
    [-55, -43, -52, -28, -51, -47,  -8, -50],
    [-47, -42, -43, -79, -64, -32, -29, -32],
    [ -4,   3, -14, -50, -57, -18,  13,   4],
    [ 17,  30,  -3, -14,   6,  -1,  40,  18]]
    
    const pawntable_b = pawntable.slice().reverse();
    const knightstable_b = pawntable.slice().reverse();
    const bishopstable_b = pawntable.slice().reverse();
    const rookstable_b = pawntable.slice().reverse();
    const queenstable_b = pawntable.slice().reverse();
    const kingstable_b = pawntable.slice().reverse();
    

    let pawn = 0
    let knight = 0
    let rook = 0
    let queen = 0
    let king = 0
    let bishop = 0

    let pawnO = 0
    let knightO = 0
    let rookO = 0
    let queenO = 0
    let kingO = 0
    let bishopO = 0

    var whitePawns = game.SQUARES.filter(function(square) {
      var piece = game.get(square);
      return piece && piece.type === 'p' && piece.color === 'w';
    });
    var whiteKnigts = game.SQUARES.filter(function(square) {
      var piece = game.get(square);
      return piece && piece.type === 'n' && piece.color === 'w';
    });
    var whiteBishops = game.SQUARES.filter(function(square) {
      var piece = game.get(square);
      return piece && piece.type === 'b' && piece.color === 'w';
    });
    var whiteRooks = game.SQUARES.filter(function(square) {
      var piece = game.get(square);
      return piece && piece.type === 'r' && piece.color === 'w';
    });
    var whiteQueen = game.SQUARES.filter(function(square) {
      var piece = game.get(square);
      return piece && piece.type === 'q' && piece.color === 'w';
    });
    var whiteKing = game.SQUARES.filter(function(square) {
      var piece = game.get(square);
      return piece && piece.type === 'k' && piece.color === 'w';
    });


    var blackPawns = game.SQUARES.filter(function(square) {
      var piece = game.get(square);
      return piece && piece.type === 'p' && piece.color === 'b';
    });
    var blackKnigts = game.SQUARES.filter(function(square) {
      var piece = game.get(square);
      return piece && piece.type === 'n' && piece.color === 'b';
    });
    var blackBishops = game.SQUARES.filter(function(square) {
      var piece = game.get(square);
      return piece && piece.type === 'b' && piece.color === 'b';
    });
    var blackRooks = game.SQUARES.filter(function(square) {
      var piece = game.get(square);
      return piece && piece.type === 'r' && piece.color === 'b';
    });
    var blackQueen = game.SQUARES.filter(function(square) {
      var piece = game.get(square);
      return piece && piece.type === 'q' && piece.color === 'b';
    });
    var blackKing = game.SQUARES.filter(function(square) {
      var piece = game.get(square);
      return piece && piece.type === 'k' && piece.color === 'b';
    });


    for (let i in whitePawns){
      var row = game.SQUARES.indexOf(whitePawns[i]) / 8;
      var col = game.SQUARES.indexOf(whitePawns[i]) % 8;
      console.log(row,col)
      pawn += pawntable[row][col]
    }
    for (let i in whiteKnigts){
      var row = game.SQUARES.indexOf(whiteKnigts[i]) / 8;
      var col = game.SQUARES.indexOf(whiteKnigts[i]) % 8;
      knight += knightstable[row][col]
    }

    for (let i in whiteBishops){
      var row = game.SQUARES.indexOf(whiteBishops[i]) / 8;
      var col = game.SQUARES.indexOf(whiteBishops[i]) % 8;
      bishop += bishopstable[row][col]
    }

    for (let i in whiteRooks){
      var row = game.SQUARES.indexOf(whiteRooks[i]) / 8;
      var col = game.SQUARES.indexOf(whiteRooks[i]) % 8;
      rook += rookstable[row][col]}

    for (let i in whiteQueen){
      var row = game.SQUARES.indexOf(whiteQueen[i]) / 8;
      var col = game.SQUARES.indexOf(whiteQueen[i]) % 8;
      queen += queenstable[row][col]
    }
    for (let i in whiteKing){
      var row = game.SQUARES.indexOf(whiteKing[i]) / 8;
      var col = game.SQUARES.indexOf(whiteKing[i]) % 8;
      king += kingstable[row][col]
    }

    // Black Pieces


    for (let i in blackPawns){
      var row = game.SQUARES.indexOf(blackPawns[i]) / 8;
      var col = game.SQUARES.indexOf(blackPawns[i]) % 8;
      pawnO += pawntable_b[row][col]
    }
    for (let i in blackKnigts){
      var row = game.SQUARES.indexOf(blackKnigts[i]) / 8;
      var col = game.SQUARES.indexOf(blackKnigts[i]) % 8;
      knightO += knightstable_b[row][col]
    }

    for (let i in blackBishops){
      var row = game.SQUARES.indexOf(blackBishops[i]) / 8;
      var col = game.SQUARES.indexOf(blackBishops[i]) % 8;
      bishopO += bishopstable_b[row][col]
    }

    for (let i in blackRooks){
      var row = game.SQUARES.indexOf(blackRooks[i]) / 8;
      var col = game.SQUARES.indexOf(blackRooks[i]) % 8;
      rookO += rookstable_b[row][col]
    }

    for (let i in blackQueen){
      var row = game.SQUARES.indexOf(blackQueen[i]) / 8;
      var col = game.SQUARES.indexOf(blackQueen[i]) % 8;
      queenO += queenstable_b[row][col]
    }
    for (let i in blackKing){
      var row = game.SQUARES.indexOf(blackKing[i]) / 8;
      var col = game.SQUARES.indexOf(blackKing[i]) % 8;
      kingO += kingstable_b[row][col]
    }
    
    var score = (pawn + pawnO) + (knight + knightO) + (rook + rookO) + (queen + queenO) + (king + kingO) + (bishop + bishopO)

    return score

  }

  function PieceSquareTable(){

    function squareToIndex(square) {
      var file = square.charCodeAt(0) - 97; // 'a' has char code 97
      var rank = 8 - parseInt(square.charAt(1));
      return rank * 8 + file;
    }

    const pawntable = [
      100, 100, 100, 100, 105, 100, 100,  100,
      78,  83,  86,  73, 102,  82,  85,  90,
      7,  29,  21,  44,  40,  31,  44,   7,
      -17,  16,  -2,  15,  14,   0,  15, -13,
      -26,   3,  10,   9,   6,   1,   0, -23,
      -22,   9,   5, -11, -10,  -2,   3, -19,
      -31,   8,  -7, -37, -36, -14,   3, -31,
        0,   0,   0,   0,   0,   0,   0,   0]

    const knightstable = [-66, -53, -75, -75, -10, -55, -58, -70,
    -3,  -6, 100, -36,   4,  62,  -4, -14,
    10,  67,   1,  74,  73,  27,  62,  -2,
    24,  24,  45,  37,  33,  41,  25,  17,
    -1,   5,  31,  21,  22,  35,   2,   0,
    -18,  10,  13,  22,  18,  15,  11, -14,
    -23, -15,   2,   0,   2,   0, -23, -20,
    -74, -23, -26, -24, -19, -35, -22, -69]

    const bishopstable = [
      -59, -78, -82, -76, -23,-107, -37, -50,
      -11,  20,  35, -42, -39,  31,   2, -22,
      -9,  39, -32,  41,  52, -10,  28, -14,
      25,  17,  20,  34,  26,  25,  15,  10,
      13,  10,  17,  23,  17,  16,   0,   7,
      14,  25,  24,  15,   8,  25,  20,  15,
      19,  20,  11,   6,   7,   6,  20,  16,
      -7,   2, -15, -12, -14, -15, -10, -10]

    const rookstable = [
      35,  29,  33,   4,  37,  33,  56,  50,
      55,  29,  56,  67,  55,  62,  34,  60,
      19,  35,  28,  33,  45,  27,  25,  15,
      0,   5,  16,  13,  18,  -4,  -9,  -6,
      -28, -35, -16, -21, -13, -29, -46, -30,
      -42, -28, -42, -25, -25, -35, -26, -46,
      -53, -38, -31, -26, -29, -43, -44, -53,
      -30, -24, -18,   5,  -2, -18, -31, -32]

    const queenstable = [
      6,   1,  -8,-104,  69,  24,  88,  26,
      14,  32,  60, -10,  20,  76,  57,  24,
      -2,  43,  32,  60,  72,  63,  43,   2,
      1, -16,  22,  17,  25,  20, -13,  -6,
      -14, -15,  -2,  -5,  -1, -10, -20, -22,
      -30,  -6, -13, -11, -16, -11, -16, -27,
      -36, -18,   0, -19, -15, -15, -21, -38,
      -39, -30, -31, -13, -31, -36, -34, -42]

    const kingstable = [
      4,  54,  47, -99, -99,  60,  83, -62,
      -32,  10,  55,  56,  56,  55,  10,   3,
      -62,  12, -57,  44, -67,  28,  37, -31,
      -55,  50,  11,  -4, -19,  13,   0, -49,
      -55, -43, -52, -28, -51, -47,  -8, -50,
      -47, -42, -43, -79, -64, -32, -29, -32,
      -4,   3, -14, -50, -57, -18,  13,   4,
      17,  30,  -3, -14,   6,  -1,  40,  18]
    
    const pawntable_b = pawntable.slice().reverse();
    const knightstable_b = pawntable.slice().reverse();
    const bishopstable_b = pawntable.slice().reverse();
    const rookstable_b = pawntable.slice().reverse();
    const queenstable_b = pawntable.slice().reverse();
    const kingstable_b = pawntable.slice().reverse();

    console.log(pawntable)
    console.log(pawntable_b)
    

    let pawn = 0
    let knight = 0
    let rook = 0
    let queen = 0
    let king = 0
    let bishop = 0

    let pawnO = 0
    let knightO = 0
    let rookO = 0
    let queenO = 0
    let kingO = 0
    let bishopO = 0

    var whitePawns = game.SQUARES.filter(function(square) {
      var piece = game.get(square);
      return piece && piece.type === 'p' && piece.color === 'w';
    });
    var whiteKnigts = game.SQUARES.filter(function(square) {
      var piece = game.get(square);
      return piece && piece.type === 'n' && piece.color === 'w';
    });
    var whiteBishops = game.SQUARES.filter(function(square) {
      var piece = game.get(square);
      return piece && piece.type === 'b' && piece.color === 'w';
    });
    var whiteRooks = game.SQUARES.filter(function(square) {
      var piece = game.get(square);
      return piece && piece.type === 'r' && piece.color === 'w';
    });
    var whiteQueen = game.SQUARES.filter(function(square) {
      var piece = game.get(square);
      return piece && piece.type === 'q' && piece.color === 'w';
    });
    var whiteKing = game.SQUARES.filter(function(square) {
      var piece = game.get(square);
      return piece && piece.type === 'k' && piece.color === 'w';
    });


    var blackPawns = game.SQUARES.filter(function(square) {
      var piece = game.get(square);
      return piece && piece.type === 'p' && piece.color === 'b';
    });
    var blackKnigts = game.SQUARES.filter(function(square) {
      var piece = game.get(square);
      return piece && piece.type === 'n' && piece.color === 'b';
    });
    var blackBishops = game.SQUARES.filter(function(square) {
      var piece = game.get(square);
      return piece && piece.type === 'b' && piece.color === 'b';
    });
    var blackRooks = game.SQUARES.filter(function(square) {
      var piece = game.get(square);
      return piece && piece.type === 'r' && piece.color === 'b';
    });
    var blackQueen = game.SQUARES.filter(function(square) {
      var piece = game.get(square);
      return piece && piece.type === 'q' && piece.color === 'b';
    });
    var blackKing = game.SQUARES.filter(function(square) {
      var piece = game.get(square);
      return piece && piece.type === 'k' && piece.color === 'b';
    });


    for (let i of whitePawns){
      j = squareToIndex(i)
      pawn += pawntable[j]
    }
    for (let i of whiteKnigts){
      j = squareToIndex(i)
      knight += knightstable[j]
    }

    for (let i of whiteBishops){
      j = squareToIndex(i)
      bishop += bishopstable[j]
    }

    for (let i of whiteRooks){
      j = squareToIndex(i)
      rook += rookstable[j]
    }

    for (let i of whiteQueen){
      j = squareToIndex(i)
      queen += queenstable[j]
    }
    for (let i of whiteKing){
      j = squareToIndex(i)
      king += kingstable[j]
    }

    // Black Pieces


    for (let i of blackPawns){
      var j = squareToIndex(i)
      pawnO += pawntable_b[j]
    }
    for (let i of blackKnigts){
      var j = squareToIndex(i)
      knightO += knightstable_b[j]
    }

    for (let i of blackBishops){
      var j = squareToIndex(i)
      bishopO += bishopstable_b[j]
    }

    for (let i of blackRooks){
      var j = squareToIndex(i)
      rookO += rookstable_b[j]
    }

    for (let i of blackQueen){
      var j = squareToIndex(i)
      queenO += queenstable_b[j]
    }
    for (let i of blackKing){
      var j = squareToIndex(i)
      kingO += kingstable_b[j]
    }
    
    var score = (pawn + pawnO) + (knight + knightO) + (rook + rookO) + (queen + queenO) + (king + kingO) + (bishop + bishopO)

    return score

  }

  function evaluation(){
    let score = 0;
    const fen = game.fen();

    const white = {'P':100,'N':300,'B':300,'R':500,'Q':1000};
    const black = {'p':100,'n':300,'b':300,'r':500,'q':1000};

    for (const key in white){
      const value = white[key];
      const regex = new RegExp(key, 'g');
      score += (fen.match(regex) || []).length * value;
      
    };

    for (const key in black){
      const value = black[key];
      const regex = new RegExp(key, 'g');
      score -= (fen.match(regex) || []).length * value;
    
    };

    score += PieceSquareTable()

    if (game.game_over()) {
      if (game.turn() === 'b'){
        return -9999;
      } 
      else {
        return 9999;
      }}
    if (game.in_draw()){
      return 0;

    }

    return score;

  }

  function Quiesce(ply, alpha, beta){
    if (ply == 0){
      return evaluation();
    }
    let stand_pat = evaluation();
    if (stand_pat >= beta){
      return beta;
    }

    let delta = 975
    if( alpha < stand_pat ){
        alpha = stand_pat;}

    const moves = game.moves({ verbose: true }).filter(move => move.captured);
    for (let move of moves){
      game.move(move);
      let score = -Quiesce(ply-1, -beta, -alpha);
      game.undo();

      if (move.flags.includes('p')) {
        delta+=775;
      }

      if ( stand_pat < alpha - delta ) {
        return alpha;
     }     

      if( score >= beta ){
            return beta;}
      if( score > alpha ){
           alpha = score;}
    }
    
    return alpha;

  }


  function negamax(ply, alpha, beta){
    if (ply === 0){
      return Quiesce(6,alpha,beta);
    };

    let score = 0;
    let best_value = -1000;

    const legal_moves = game.moves();

    for (let move of legal_moves){
      game.move(move);
      score = -negamax(ply-1, -beta, -alpha);
      game.undo();

      if (score > best_value){
        best_value = score;
      };

      if (score >= beta){ return beta;};

      if (score > alpha){
        alpha = score;
      };
    }
    return best_value;

  }

  function prodigy(){

    let best_move = null;
    let best_value = -1000;

    let alpha = -1000
    let beta = 1000

    const speed_dragon = ["c5","g6","Bg7","d6","Nf6","O-O-O","b6","Bb7","Nc6"]
    
    const legal_moves = game.moves();

    for (let move of legal_moves){
      
      game.move(move);
      let score = -negamax(0,-beta,-alpha);
      game.undo();

      

      if (speed_dragon.includes(move)){
        score+=50
      }

      if (best_move === null){
        best_move = move;
        
      };

      if (best_value < score){
        best_value = score;
        best_move = move;
      }
  
    }
    makeAMove(best_move);
    
  }

  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return false;
    setTimeout(prodigy, 200);
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
    </div>
  );
}

export default App;