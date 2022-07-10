import React, { useEffect, useState } from 'react';
import './App.css'

import { Board } from './models/Board';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import { Winner } from './models/Winner';
import { winByType } from './models/Winner';

import BoardComponent from './components/BoardComponent';
import LostFigures from './components/LostFigures';
import WinnerComponent from './components/WinnerComponent';
import TimerComponent from './components/TimerComponent';

const App = () => {

  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [winner, setWinner] = useState<Winner>(new Winner(null, null));

  useEffect(() => {
    restart();
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
    setWinner(new Winner(null, null));
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

  function setVictorious(player: Player | null, winBy: winByType) {
    setWinner(new Winner(player, winBy));
  }

  return (

    <div className='app'>

      <TimerComponent
        currentPlayer={currentPlayer}
        start={start}
        restart={restart}
        stop={board.check.mate}
        winByTime={setVictorious}
      />
      <div className='main'>
        <BoardComponent
          board={board}
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          swapPlayer={swapPlayer}
          winByMate={setVictorious}
        />
        {winner.player
          ?
          <WinnerComponent
            winner={winner}
          />
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
