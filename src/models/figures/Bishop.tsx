import bishopBlack from '../../assets/bishop-black.png';
import bishopWhite from '../../assets/bishop-white.png';
import { BoardModel } from '../BoardModel';
import { Figure } from './Figure';
import { Coords, Names, Side } from './types/common';

export class Bishop extends Figure {
  side;

  board;

  private minCoord = 0;

  private maxCoord = 7;

  private availableCoords: Coords[] = [];

  private xLeftCoord = 0;

  private xRightCoord = 0;

  private yCoord = 0;

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
      this.availableCoords.push(
        {
          x: --this.xLeftCoord,
          y: this.yCoord,
        },
      );
    }
    if (this.xRightCoord < this.maxCoord) {
      this.availableCoords.push(
        {
          x: ++this.xRightCoord,
          y: this.yCoord,
        },
      );
    }
    if (
      this.xLeftCoord === this.minCoord
      && this.xRightCoord === this.maxCoord
    ) this.isAvailableCalculation = false;
  }

  private resetCalculation({ x, y }: Coords) {
    this.xLeftCoord = x;
    this.xRightCoord = x;
    this.yCoord = y;
    this.isAvailableCalculation = true;
  }

  public getAvailableCoords(coords: Coords) {
    this.resetCalculation(coords);

    while (this.yCoord > this.minCoord && this.isAvailableCalculation) {
      --this.yCoord;
      this.setCoords();
    }

    this.resetCalculation(coords);

    while (this.yCoord < this.maxCoord && this.isAvailableCalculation) {
      ++this.yCoord;
      this.setCoords();
    }

    this.board.setAvailableCoords(this.availableCoords);
  }

  public clearMarks() {
    this.board.cells.forEach((row) => {
      row.forEach((cell) => {
        // eslint-disable-next-line no-param-reassign
        cell.isAvailable = false;
      });
    });

    this.board.reloadCells();
  }
}
