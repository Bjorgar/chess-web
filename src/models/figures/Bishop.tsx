import bishopBlack from '../../assets/bishop-black.png';
import bishopWhite from '../../assets/bishop-white.png';
import { BoardModel } from '../BoardModel';
import { Figure } from './Figure';
import { Coords, Names, Side } from './types/common';

export class Bishop extends Figure {
  side;

  board;

  private xLeftCoord = 0;

  private xRightCoord = 0;

  private isAvailableCalculation = true;

  constructor(
    side: Side,
    board: BoardModel,
  ) {
    super({
      side,
      blackFigure: bishopBlack,
      whiteFigure: bishopWhite,
      name: Names.bishop,
    });

    this.side = side;
    this.board = board;
  }

  private setCoords() {
    if (this.xLeftCoord > this.minCoord) {
      const nextCell = this.board.cells[this.yCoord][--this.xLeftCoord];

      if (!nextCell.figure) {
        nextCell.isAvailable = true;
      } else {
        this.xLeftCoord = this.minCoord;
      }
    }

    if (this.xRightCoord < this.maxCoord) {
      const nextCell = this.board.cells[this.yCoord][++this.xRightCoord];

      if (!nextCell.figure) {
        nextCell.isAvailable = true;
      } else {
        this.xRightCoord = this.maxCoord;
      }
    }

    if (
      this.xLeftCoord === this.minCoord
      && this.xRightCoord === this.maxCoord
    ) this.isAvailableCalculation = false;
  }

  private resetValues({ x, y }: Coords) {
    this.xLeftCoord = x;
    this.xRightCoord = x;
    this.isAvailableCalculation = true;
    this.resetYCoord(y);
  }

  public getAvailableCoords(coords: Coords) {
    this.resetValues(coords);

    while (this.yCoord > this.minCoord && this.isAvailableCalculation) {
      --this.yCoord;
      this.setCoords();
    }

    this.resetValues(coords);

    while (this.yCoord < this.maxCoord && this.isAvailableCalculation) {
      ++this.yCoord;
      this.setCoords();
    }

    this.board.refreshCells();
  }
}
