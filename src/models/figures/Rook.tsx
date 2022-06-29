import rookBlack from '../../assets/rook-black.png';
import rookWhite from '../../assets/rook-white.png';
import { BoardModel } from '../BoardModel';
import { Figure } from './Figure';
import { Coords, Names, Side } from './types/common';

export class Rook extends Figure {
  side;

  board;

  constructor(
    side: Side,
    board: BoardModel,
  ) {
    super({
      side,
      blackFigure: rookBlack,
      whiteFigure: rookWhite,
      name: Names.rook,
    });

    this.side = side;
    this.board = board;
  }

  private setHorizontalCoords(x: number) {
    while (this.xCoord !== this.minCoord) {
      const nextCell = this.board.cells[this.yCoord][--this.xCoord];
      if (nextCell.figure) {
        this.xCoord = this.minCoord;
      } else {
        nextCell.isAvailable = true;
      }
    }

    this.resetXCoord(x);

    while (this.xCoord !== this.maxCoord) {
      const nextCell = this.board.cells[this.yCoord][++this.xCoord];
      if (nextCell.figure) {
        this.xCoord = this.maxCoord;
      } else {
        nextCell.isAvailable = true;
      }
    }

    this.resetXCoord(x);
  }

  private setVerticalCoords(y: number) {
    while (this.yCoord !== this.minCoord) {
      const nextCell = this.board.cells[--this.yCoord][this.xCoord];
      if (nextCell.figure) {
        this.yCoord = this.minCoord;
      } else {
        nextCell.isAvailable = true;
      }
    }

    this.resetYCoord(y);

    while (this.yCoord !== this.maxCoord) {
      const nextCell = this.board.cells[++this.yCoord][this.xCoord];
      if (nextCell.figure) {
        this.yCoord = this.maxCoord;
      } else {
        nextCell.isAvailable = true;
      }
    }

    this.resetYCoord(y);
  }

  public getAvailableCoords({ x, y }: Coords) {
    this.setDefaultValues({ x, y });
    this.setHorizontalCoords(x);
    this.setVerticalCoords(y);

    this.board.refreshCells();
  }
}
