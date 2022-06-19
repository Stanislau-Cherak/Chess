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
    const check = this.cell.board.check.check;
    const checkFigure = this.cell.board.check.figure;
    const checkX = this.cell.board.check.cell[0];
    const checkY = this.cell.board.check.cell[1];

    if (this.cell.board.check.mate) {
      return false;
    }

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
          cell.figure.checkMove(target)
        ) {
          return false;
        }
        if ((cell.figure?.name === FigureNames.PAWN || cell.figure?.name === FigureNames.KING)
          &&
          cell.figure?.color === Colors.WHITE
          &&
          this.color === Colors.BLACK
          &&
          ((target.x === cell.x + 1 || target.x === cell.x - 1) && target.y - cell.y === -1)) {
          return false;
        }
        if ((cell.figure?.name === FigureNames.PAWN || cell.figure?.name === FigureNames.KING)
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

    if (check
      &&
      checkX
      &&
      checkY
      &&
      checkX === target.x
      &&
      checkY === target.y
    ) {
      return true
    }

    if (check
      &&
      checkFigure === FigureNames.QUEEN
      &&
      checkX
      &&
      checkY
      &&
      (this.cell.board.getCell(checkX, checkY).isEmptyDiagonal(target)
        ||
        this.cell.board.getCell(checkX, checkY).isEmptyHorizontal(target)
        ||
        this.cell.board.getCell(checkX, checkY).isEmptyVertical(target)
      )
    ) {
      return false;
    }

    if (check
      &&
      checkFigure === FigureNames.BISHOP
      &&
      checkX
      &&
      checkY
      &&
      this.cell.board.getCell(checkX, checkY).isEmptyDiagonal(target)) {
      return false;
    }

    if (check
      &&
      checkFigure === FigureNames.ROOK
      &&
      checkX
      &&
      checkY
      &&
      (this.cell.board.getCell(checkX, checkY).isEmptyHorizontal(target)
        ||
        this.cell.board.getCell(checkX, checkY).isEmptyVertical(target)
      )) {
      return false;
    }

    if ((dx <= 1) && (dy <= 1)) {
      return true;
    }

    return false;
  }
}