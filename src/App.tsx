import React, { useEffect, useState } from 'react';
import './App.css'

import { Board } from './models/Board';
import { Player } from './models/Player';
import { Colors } from './models/Colors';

import BoardComponent from './components/BoardComponent';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';
import Winner from './components/Winner';

const App = () => {

  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [winner, setWinner] = useState<Player | null>(null);

  useEffect(() => {
    restart();
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
    setWinner(null);
  }

  function start() {
    const newBoard = new Board();
    newBoard.start = true;
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  }

  function winByTime(player: Player | null) {
    setWinner(player?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  }

  return (

    <div className='app'>

      <Timer
        currentPlayer={currentPlayer}
        start={start}
        restart={restart}
        winByTime={winByTime}
      />
      <div className='main'>
        <BoardComponent
          board={board}
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          swapPlayer={swapPlayer}
        />
        {winner
          ?
          <Winner winner={winner} />
          :
          null}
      </div>
      <div>
        <LostFigures
          title='Black Figures'
          figures={board.lostBlackFigures}
        />
        <LostFigures
          title='White Figures'
          figures={board.lostWhiteFigures}
        />
      </div>
    </div>
  );
}

export default App;
