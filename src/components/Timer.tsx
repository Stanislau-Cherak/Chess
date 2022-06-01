import React, { useEffect, useRef, useState } from "react";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";

interface TimerProps {
  currentPlayer: Player | null,
  restart: () => void,
  winByTime: (player: Player | null) => void,

}

const Timer: React.FC<TimerProps> = ({ currentPlayer, restart, winByTime }) => {

  const [blackTime, setBlackTime] = useState(1500);
  const [whiteTime, setWhiteTime] = useState(1500);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
      startTimer();
  }, [currentPlayer]);

  useEffect(()=>{
    if(whiteTime<=0||blackTime<=0){
      winByTime(currentPlayer);
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

  function stopTimer(){
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
    restart()
  }

  return (
    <div className="timer">
      <div>
        <button
          onClick={handleRestart}
        >Restart Game
        </button>
      </div>
      <h3>
        Black - {blackTime}
      </h3>
      <h3>
        White - {whiteTime}
      </h3>
    </div>
  )
}

export default Timer;