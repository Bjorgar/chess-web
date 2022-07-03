import kingBlack from '../../assets/king-black.png';
import kingWhite from '../../assets/king-white.png';
import { BoardModel } from '../BoardModel';
import { Figure } from './Figure';
import { Coords, FigureName, Side } from './types/common';

export class King extends Figure {
  constructor(
    side: Side,
    board: BoardModel,
    coords: Coords,
  ) {
    super({
      side,
      blackFigure: kingBlack,
      whiteFigure: kingWhite,
      name: FigureName.king,
      coords,
      board,
    });

    this.side = side;
    this.board = board;
    this.board.kings[side] = this;
  }

  private setCells({ x, y }: Coords) {
    if (y - 1 >= this.minCoord && x - 1 >= this.minCoord) {
      this.checkNextCell(this.board.cells[y - 1][x - 1]);
    }
    if (y - 1 >= this.minCoord && x + 1 <= this.maxCoord) {
      this.checkNextCell(this.board.cells[y - 1][x + 1]);
    }
    if (y + 1 <= this.maxCoord && x + 1 <= this.maxCoord) {
      this.checkNextCell(this.board.cells[y + 1][x + 1]);
    }
    if (y + 1 <= this.maxCoord && x - 1 >= this.minCoord) {
      this.checkNextCell(this.board.cells[y + 1][x - 1]);
    }
    if (y - 1 >= this.minCoord) {
      this.checkNextCell(this.board.cells[y - 1][x]);
    }
    if (y + 1 <= this.maxCoord) {
      this.checkNextCell(this.board.cells[y + 1][x]);
    }
    if (x - 1 >= this.minCoord) {
      this.checkNextCell(this.board.cells[y][x - 1]);
    }
    if (x + 1 <= this.maxCoord) {
      this.checkNextCell(this.board.cells[y][x + 1]);
    }
  }

  public recordNextPossibleCoords() {
    this.moveCoords.possibleMoves = [];
    this.setCells({ x: this.xCoord, y: this.yCoord });

    const alliedPossibleMoves = this.side === 'white'
      ? this.board.whiteNextPossibleMoves
      : this.board.blackNextPossibleMoves;

    alliedPossibleMoves.push(this.moveCoords);
  }

  public showAvailableMoves() {
    this.moveCoords.possibleMoves = [];
    this.setCells({ x: this.xCoord, y: this.yCoord });
    this.checkAvailableMoves();
    this.board.refreshCells();
  }
}
