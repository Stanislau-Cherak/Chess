import React, { useEffect, useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";
import { winByType } from "../models/Winner";

import CellComponent from "./CellComponent";

interface BoardProps {
  board: Board;
  currentPlayer: Player | null;
  setBoard: (board: Board) => void;
  swapPlayer: () => void;
  winByMate: (player: Player | null, winBy: winByType) => void,
}

const BoardComponent: React.FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer, winByMate }) => {

  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function click(cell: Cell) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  }

  function highlightCell() {
    board.highlightCell(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  useEffect(() => {
    highlightCell();
  }, [selectedCell])

  useEffect(() => {
    if (board.check.mate && board.check.color === Colors.WHITE) {
      winByMate(new Player(Colors.BLACK), 'mate');
    }
    if (board.check.mate && board.check.color === Colors.BLACK) {
      winByMate(new Player(Colors.WHITE), 'mate');
    }
  }, [board])

  return (
    <div>
      <h4 className="player">
        Current Player: {currentPlayer?.color}
      </h4>
      <div className="board">
        {board.cells.map((row, i) =>
          <React.Fragment key={i}>
            {row.map(cell =>
              <CellComponent
                click={click}
                cell={cell}
                key={cell.id}
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
              />

            )}
          </React.Fragment>
        )}
      </div>
    </div>

  )
}

export default BoardComponent;