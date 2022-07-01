import queenBlack from '../../assets/queen-black.png';
import queenWhite from '../../assets/queen-white.png';
import { BoardModel } from '../BoardModel';
import { Figure } from './Figure';
import { Coords, FigureName, Side } from './types/common';

export class Queen extends Figure {
  private xLeftCoord = 0;

  private xRightCoord = 0;

  private isAvailableRDiagonal = true;

  private isAvailableLDiagonal = true;

  private isAvailableVertical = true;

  private isAvailableHorizontal = true;

  private isAvailableCalculation = true;

  constructor(
    side: Side,
    board: BoardModel,
    coords: Coords,
  ) {
    super({
      side,
      blackFigure: queenBlack,
      whiteFigure: queenWhite,
      name: FigureName.queen,
      coords,
      board,
    });

    this.side = side;
    this.board = board;
  }

  private setDiagonalXCoords(x: number) {
    this.xLeftCoord = x;
    this.xRightCoord = x;
  }

  private resetDiagonalCalculation({ x, y }: Coords) {
    this.setDiagonalXCoords(x);
    this.isAvailableRDiagonal = true;
    this.isAvailableLDiagonal = true;
    this.isAvailableVertical = true;
    this.isAvailableCalculation = true;
    this.setYCoord(y);
  }

  private resetHorizontalCalculation(x: number) {
    this.setXCoord(x);
    this.isAvailableHorizontal = true;
  }

  private setVerticalAndDiagonalCells() {
    if (this.xLeftCoord > this.minCoord && this.isAvailableLDiagonal) {
      const nextCell = this.board.cells[this.yCoord][--this.xLeftCoord];
      this.isAvailableLDiagonal = this.checkNextCell(nextCell);
    }

    if (this.xRightCoord < this.maxCoord && this.isAvailableRDiagonal) {
      const nextCell = this.board.cells[this.yCoord][++this.xRightCoord];
      this.isAvailableRDiagonal = this.checkNextCell(nextCell);
    }

    if (this.isAvailableVertical) {
      const nextCell = this.board.cells[this.yCoord][this.xCoord];
      this.isAvailableVertical = this.checkNextCell(nextCell);
    }

    if (
      !this.isAvailableLDiagonal
      && !this.isAvailableRDiagonal
      && !this.isAvailableVertical
      && !this.isAvailableVertical
    ) this.isAvailableCalculation = false;
  }

  private setHorizontalCells(x: number) {
    while (this.xCoord !== this.minCoord && this.isAvailableHorizontal) {
      const nextCell = this.board.cells[this.yCoord][--this.xCoord];
      this.isAvailableHorizontal = this.checkNextCell(nextCell);
    }

    this.resetHorizontalCalculation(x);

    while (this.xCoord !== this.maxCoord && this.isAvailableHorizontal) {
      const nextCell = this.board.cells[this.yCoord][++this.xCoord];
      this.isAvailableHorizontal = this.checkNextCell(nextCell);
    }

    this.resetHorizontalCalculation(x);
  }

  private setCells(coords: Coords) {
    const { x } = coords;

    this.setDiagonalXCoords(x);
    // Set upper coords
    while (this.yCoord !== this.minCoord && this.isAvailableCalculation) {
      --this.yCoord;
      this.setVerticalAndDiagonalCells();
    }

    this.resetDiagonalCalculation(coords);

    // Set lower coords
    while (this.yCoord !== this.maxCoord && this.isAvailableCalculation) {
      ++this.yCoord;
      this.setVerticalAndDiagonalCells();
    }

    this.resetDiagonalCalculation(coords);

    this.setHorizontalCells(x);
  }

  public recordNextPossibleCoords() {
    this.isPreview = true;
    this.setCells({ x: this.xCoord, y: this.yCoord });
    this.isPreview = false;
  }

  public showAvailableMoves() {
    this.setCells({ x: this.xCoord, y: this.yCoord });
    this.board.refreshCells();
  }
}
