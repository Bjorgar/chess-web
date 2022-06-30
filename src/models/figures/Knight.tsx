import knightBlack from '../../assets/knight-black.png';
import knightWhite from '../../assets/knight-white.png';
import { BoardModel } from '../BoardModel';
import { Figure } from './Figure';
import { Coords, Names, Side } from './types/common';

export class Knight extends Figure {
  side;

  board;

  private nextX = 0;

  private nextY = 0;

  constructor(
    side: Side,
    board: BoardModel,
  ) {
    super({
      side,
      blackFigure: knightBlack,
      whiteFigure: knightWhite,
      name: Names.knight,
    });

    this.side = side;
    this.board = board;
  }

  private setAvailableCells() {
    const nextCell = this.board.cells[this.nextY][this.nextX];
    this.checkNextCell(nextCell, this.side);
  }

  private setAvailableCoords({ x, y }: Coords) {
    if (y - 2 >= this.minCoord) {
      if (x + 1 <= this.maxCoord) {
        this.nextY = y - 2;
        this.nextX = x + 1;
        this.setAvailableCells();
      }
      if (x - 1 >= this.minCoord) {
        this.nextY = y - 2;
        this.nextX = x - 1;
        this.setAvailableCells();
      }
    }

    if (y + 2 <= this.maxCoord) {
      if (x + 1 <= this.maxCoord) {
        this.nextY = y + 2;
        this.nextX = x + 1;
        this.setAvailableCells();
      }
      if (x - 1 >= this.minCoord) {
        this.nextY = y + 2;
        this.nextX = x - 1;
        this.setAvailableCells();
      }
    }

    if (x - 2 >= this.minCoord) {
      if (y + 1 <= this.maxCoord) {
        this.nextX = x - 2;
        this.nextY = y + 1;
        this.setAvailableCells();
      }
      if (y - 1 >= this.minCoord) {
        this.nextX = x - 2;
        this.nextY = y - 1;
        this.setAvailableCells();
      }
    }

    if (x + 2 <= this.maxCoord) {
      if (y + 1 <= this.maxCoord) {
        this.nextX = x + 2;
        this.nextY = y + 1;
        this.setAvailableCells();
      }
      if (y - 1 >= this.minCoord) {
        this.nextX = x + 2;
        this.nextY = y - 1;
        this.setAvailableCells();
      }
    }
  }

  public getAvailableCoords(coords: Coords) {
    this.setAvailableCoords(coords);
    this.board.refreshCells();
  }
}
