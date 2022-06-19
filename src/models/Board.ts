import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { Figure, FigureNames } from "./figures/Figure";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";

type check = {
  check: boolean;
  color: Colors | null;
  cell: [number | null, number | null];
  figure: FigureNames | null;
  mate: boolean;

}

export class Board {
  cells: Cell[][] = [];
  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];
  check: check = {
    check: false,
    color: null,
    cell: [null, null],
    figure: null,
    mate: false,
  }


  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = []
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null))//Black cell
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null))//white cell
        }
      }
      this.cells.push(row);
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    newBoard.check = this.check;

    return newBoard;
  }

  public highlightCell(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCell(i, 1));
      new Pawn(Colors.WHITE, this.getCell(i, 6));
    }
  }
  private addBishops() {
    new Bishop(Colors.BLACK, this.getCell(2, 0));
    new Bishop(Colors.BLACK, this.getCell(5, 0));
    new Bishop(Colors.WHITE, this.getCell(2, 7));
    new Bishop(Colors.WHITE, this.getCell(5, 7));
  }
  private addKings() {
    new King(Colors.BLACK, this.getCell(4, 0));
    new King(Colors.WHITE, this.getCell(4, 7));
  }
  private addKnights() {
    new Knight(Colors.BLACK, this.getCell(1, 0));
    new Knight(Colors.BLACK, this.getCell(6, 0));
    new Knight(Colors.WHITE, this.getCell(1, 7));
    new Knight(Colors.WHITE, this.getCell(6, 7));
  }
  private addQueens() {
    new Queen(Colors.BLACK, this.getCell(3, 0));
    new Queen(Colors.WHITE, this.getCell(3, 7));
  }
  private addRooks() {
    new Rook(Colors.BLACK, this.getCell(0, 0));
    new Rook(Colors.BLACK, this.getCell(7, 0));
    new Rook(Colors.WHITE, this.getCell(0, 7));
    new Rook(Colors.WHITE, this.getCell(7, 7));
  }
  public addFigures() {
    this.addBishops();
    this.addKings();
    this.addKnights();
    this.addPawns();
    this.addQueens();
    this.addRooks();
  }

  canKingMove(x: number, y: number): boolean {
    for (const row of this.cells) {
      for (const target of row) {
        if (this.getCell(x, y).figure?.canMove(target)) {
          return true;
        }
      }
    }
    return false;
  }

  checkKing(cell: Cell) {

    if (this.check.check
      &&
      this.check.cell[0] === cell.x
      &&
      this.check.cell[1] === cell.y
    ) {
      this.check.check = false;
      this.check.color = null;
      this.check.cell = [null, null];
      this.check.figure = null;
    }

    if (this.check.check
      &&
      cell.figure?.name === FigureNames.KING
      &&
      cell.figure.color === this.check.color
    ) {
      this.check.check = false;
      this.check.color = null;
      this.check.cell = [null, null];
      this.check.figure = null;
    }

    if (this.check.check) {
      this.check.mate = true;
    }

    for (const row of this.cells) {
      for (const target of row) {
        if (cell.figure?.checkMove(target)
          && (cell.figure.name !== FigureNames.KING)
          && (target.figure?.name === FigureNames.KING)
        ) {
          this.check.check = true;
          this.check.color = target.figure.color;
          this.check.cell = [cell.x, cell.y];
          this.check.figure = cell.figure.name;
          if (!this.canKingMove(target.x, target.y)) {
            this.check.mate = true;
          }
        }
      }
    }
  }
}