import pawnBlack from '../../assets/pawn-black.png';
import pawnWhite from '../../assets/pawn-white.png';
import { BoardModel } from '../BoardModel';
import { Figure } from './Figure';
import { Coords, Names, Side } from './types/common';

export class Pawn extends Figure {
  side;

  board;

  private step = 2;

  constructor(
    side: Side,
    board: BoardModel,
  ) {
    super({
      side,
      blackFigure: pawnBlack,
      whiteFigure: pawnWhite,
      name: Names.pawn,
    });

    this.side = side;
    this.board = board;
  }

  private setWhiteCoords({ x, y }: Coords) {
    while (this.step && y !== this.minCoord) {
      this.step--;
      const nextCell = this.board.cells[--this.yCoord][x];

      if (!nextCell.figure) {
        nextCell.isAvailable = true;
      } else {
        this.step = 0;
      }
    }
  }

  private setBlackCoords({ x, y }: Coords) {
    while (this.step && y !== this.maxCoord) {
      this.step--;
      const nextCell = this.board.cells[++this.yCoord][x];

      if (!nextCell.figure) {
        nextCell.isAvailable = true;
      } else {
        this.step = 0;
      }
    }
  }

  private resetStep() {
    this.step = 2;
  }

  public getAvailableCoords(coords: Coords) {
    this.setDefaultValues(
      coords,
      () => this.resetStep(),
    );

    if (this.side === 'white') {
      this.setWhiteCoords(coords);
    } else {
      this.setBlackCoords(coords);
    }

    this.board.refreshCells();
  }
}
