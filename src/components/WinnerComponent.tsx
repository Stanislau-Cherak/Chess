import React from "react";
import { Colors } from "../models/Colors";
import { Winner } from "../models/Winner";

interface WinnerProps {
  winner: Winner,
}

const WinnerComponent: React.FC<WinnerProps> = ({ winner }) => {

  const loser = winner.player?.color === Colors.WHITE ? 'black' : 'white';
  const reason=winner.winBy==='time'? 'at the end of the time' : 'because he was checkmated';

  return (
    <div className="winner">
      The {winner.player?.color} player won. The {loser} player lost {reason}.
    </div>
  )
}

export default WinnerComponent;