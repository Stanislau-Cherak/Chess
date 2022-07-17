import React, { useEffect, useRef, useState } from "react";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";
import { winByType } from '../models/Winner';

interface TimerProps {
  currentPlayer: Player | null,
  start: () => void,
  restart: () => void,
  stop: boolean,
  winByTime: (player: Player | null, winBy: winByType) => void,
}

const TimerComponent: React.FC<TimerProps> = ({ currentPlayer, start, restart, stop, winByTime }) => {

  const [blackTime, setBlackTime] = useState(1500);
  const [whiteTime, setWhiteTime] = useState(1500);
  const [gameStart, setGameStart] = useState<boolean>(false);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    if (gameStart) {
      startTimer();
    }
  }, [gameStart, currentPlayer]);

  useEffect(() => {
    if (whiteTime <= 0 || blackTime <= 0) {
      const winner = currentPlayer?.color === Colors.WHITE ? new Player(Colors.BLACK) : new Player(Colors.WHITE);
      winByTime(winner, 'time');
      stopTimer();
    }
    if (stop) {
      stopTimer();
    }
  }, [whiteTime, blackTime])

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  }

  function stopTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
  }

  function decrementBlackTimer() {
    if (blackTime > 0) {
      setBlackTime(prev => prev - 1);
    }
  }

  function decrementWhiteTimer() {
    if (whiteTime > 0) {
      setWhiteTime(prev => prev - 1);
    }
  }

  const handleRestart = () => {
    setWhiteTime(1500);
    setBlackTime(1500);
    restart();
    stopTimer();
  }

  const handleStart = () => {
    start();
    setGameStart(true);
  }

  return (
    <div className="timer">
      <div className="buttons-section">
        <div className="button start-button"
          onClick={handleStart}
        >Start Game
        </div>
        <div className="button restart-button"
          onClick={handleRestart}
        >Restart Game
        </div>
      </div>
      <h3 className="timer-title">
        Black - {blackTime}
      </h3>
      <h3 className="timer-title">
        White - {whiteTime}
      </h3>
    </div>
  )
}

export default TimerComponent;