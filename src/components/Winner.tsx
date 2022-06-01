import React from "react";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";

interface WinnerProps {
  winner: Player|null,
}

const Winner: React.FC<WinnerProps> = ({ winner }) => {

  const loser = winner?.color === Colors.WHITE ? 'black' : 'white';

  return (
    <div className="winner">
      The {winner?.color} player won. The {loser} player lost at the end of the time.
    </div>
  )
}

export default Winner;