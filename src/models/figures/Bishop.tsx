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

  private isAvailableRDiagonal = true;

  private isAvailableLDiagonal = true;

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

  private setDiagonalXCoords() {
    this.xLeftCoord = this.xCoord;
    this.xRightCoord = this.xCoord;
  }

  private resetValues(y: number) {
    this.setDiagonalXCoords();
    this.isAvailableCalculation = true;
    this.isAvailableRDiagonal = true;
    this.isAvailableLDiagonal = true;
    this.setYCoord(y);
  }

  private setDiagonalCells() {
    if (this.xLeftCoord > this.minCoord && this.isAvailableLDiagonal) {
      const nextCell = this.board.cells[this.yCoord][--this.xLeftCoord];
      this.isAvailableLDiagonal = this.checkNextCell(nextCell, this.side);
    }

    if (this.xRightCoord < this.maxCoord && this.isAvailableRDiagonal) {
      const nextCell = this.board.cells[this.yCoord][++this.xRightCoord];
      this.isAvailableRDiagonal = this.checkNextCell(nextCell, this.side);
    }

    if (
      !this.isAvailableLDiagonal
      && !this.isAvailableRDiagonal
    ) this.isAvailableCalculation = false;
  }

  private setCells(y: number) {
    this.setDiagonalXCoords();

    while (this.yCoord !== this.minCoord && this.isAvailableCalculation) {
      --this.yCoord;
      this.setDiagonalCells();
    }

    this.resetValues(y);

    while (this.yCoord !== this.maxCoord && this.isAvailableCalculation) {
      ++this.yCoord;
      this.setDiagonalCells();
    }

    this.resetValues(y);
  }

  public getAvailableCoords(coords: Coords) {
    const { y } = coords;

    this.setDefaultValues(coords);
    this.setCells(y);
    this.board.refreshCells();
  }
}
