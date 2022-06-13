import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";

import blackLogo from '../../assets/black-king.png';
import whiteLogo from '../../assets/white-king.png';

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KING;
  }

  canMove(target: Cell): boolean {

    const dx = Math.abs(this.cell.x - target.x);
    const dy = Math.abs(this.cell.y - target.y);

    if (!super.canMove(target)) {
      return false;
    }

    for (const row of this.cell.board.cells) {
      for (const cell of row) {
        if (cell.figure
          &&
          cell.figure?.name !== FigureNames.KING
          &&
          cell.figure?.name !== FigureNames.PAWN
          &&
          cell.figure?.color !== this.color
          &&
          cell.figure.canMove(target)
        ) {
          return false;
        }
        if (cell.figure?.name === FigureNames.PAWN
          &&
          cell.figure?.color === Colors.WHITE
          &&
          this.color === Colors.BLACK
          &&
          ((target.x === cell.x + 1 || target.x === cell.x - 1) && target.y - cell.y === -1)) {
          return false;
        }
        if (cell.figure?.name === FigureNames.PAWN
          &&
          cell.figure?.color === Colors.BLACK
          &&
          this.color === Colors.WHITE
          &&
          ((target.x === cell.x + 1 || target.x === cell.x - 1) && target.y - cell.y === 1)) {
          return false;
        }
      }
    }

    if (this.cell.board.check.check
      &&
      this.cell.board.check.figure === FigureNames.QUEEN
      &&
      target.figure?.name !== FigureNames.QUEEN
      &&
      this.cell.board.check.cell[0]
      &&
      this.cell.board.check.cell[1]
    ) {
      if (Math.abs(this.cell.board.check.cell[0] - this.cell.x) === Math.abs(this.cell.board.check.cell[1] - this.cell.y)
        &&
        Math.abs(this.cell.board.check.cell[0] - target.x) === Math.abs(this.cell.board.check.cell[1] - target.y)
      ) {
        console.log('check')
        return false
      }
      if (this.cell.board.check.cell[0] - this.cell.x === 0
        &&
        this.cell.board.check.cell[0] - target.x === 0
      ) {
        return false
      }
      if (this.cell.board.check.cell[1] - this.cell.y === 0
        &&
        this.cell.board.check.cell[1] - target.y === 0
      ) {
        return false
      }

    }

    if (this.cell.board.check.check
      &&
      this.cell.board.check.figure === FigureNames.ROOK
      &&
      target.figure?.name !== FigureNames.ROOK
      &&
      this.cell.board.check.cell[0]
      &&
      this.cell.board.check.cell[1]
    ) {
      if (this.cell.board.check.cell[0] - this.cell.x === 0
        &&
        this.cell.board.check.cell[0] - target.x === 0
      ) {
        return false
      }
      if (this.cell.board.check.cell[1] - this.cell.y === 0
        &&
        this.cell.board.check.cell[1] - target.y === 0
      ) {
        return false
      }
    }

    if (this.cell.board.check.check
      &&
      this.cell.board.check.figure === FigureNames.BISHOP
      &&
      target.figure?.name !== FigureNames.BISHOP
      &&
      this.cell.board.check.cell[0]
      &&
      this.cell.board.check.cell[1]
      &&
      Math.abs(this.cell.board.check.cell[0] - this.cell.x) === Math.abs(this.cell.board.check.cell[1] - this.cell.y)
      &&
      Math.abs(this.cell.board.check.cell[0] - target.x) === Math.abs(this.cell.board.check.cell[1] - target.y)
    ) {
      return false
    }

    if ((dx <= 1) && (dy <= 1)) {
      return true;
    }

    return false;
  }
}