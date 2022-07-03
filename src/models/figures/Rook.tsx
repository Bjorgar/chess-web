import rookBlack from '../../assets/rook-black.png';
import rookWhite from '../../assets/rook-white.png';
import { BoardModel } from '../BoardModel';
import { Figure } from './Figure';
import { Coords, FigureName, Side } from './types/common';

export class Rook extends Figure {
  private isAvailableHorizontal = true;

  private isAvailableVertical = true;

  constructor(
    side: Side,
    board: BoardModel,
    coords: Coords,
    namePrefix: string,
  ) {
    super({
      side,
      blackFigure: rookBlack,
      whiteFigure: rookWhite,
      name: FigureName.rook,
      coords,
      board,
      namePrefix,
    });

    this.side = side;
    this.board = board;
  }

  private resetHorizontal(x: number) {
    this.isAvailableHorizontal = true;
    this.setXCoord(x);
  }

  private resetVertical(y: number) {
    this.isAvailableVertical = true;
    this.setYCoord(y);
  }

  private setHorizontalCells(x: number) {
    while (this.xCoord !== this.minCoord && this.isAvailableHorizontal) {
      const nextCell = this.board.cells[this.yCoord][--this.xCoord];
      this.isAvailableHorizontal = this.checkNextCell(nextCell);
    }

    this.resetHorizontal(x);

    while (this.xCoord !== this.maxCoord && this.isAvailableHorizontal) {
      const nextCell = this.board.cells[this.yCoord][++this.xCoord];
      this.isAvailableHorizontal = this.checkNextCell(nextCell);
    }

    this.resetHorizontal(x);
  }

  private setVerticalCells(y: number) {
    while (this.yCoord !== this.minCoord && this.isAvailableVertical) {
      const nextCell = this.board.cells[--this.yCoord][this.xCoord];
      this.isAvailableVertical = this.checkNextCell(nextCell);
    }

    this.resetVertical(y);

    while (this.yCoord !== this.maxCoord && this.isAvailableVertical) {
      const nextCell = this.board.cells[++this.yCoord][this.xCoord];
      this.isAvailableVertical = this.checkNextCell(nextCell);
    }

    this.resetVertical(y);
  }

  private setCells({ x, y }: Coords) {
    this.setHorizontalCells(x);
    this.setVerticalCells(y);
  }

  public recordNextPossibleCoords() {
    this.isPreview = true;

    this.moveCoords.possibleMoves = [];
    this.setCells({ x: this.xCoord, y: this.yCoord });

    const alliedPossibleMoves = this.side === 'white'
      ? this.board.whiteNextPossibleMoves
      : this.board.blackNextPossibleMoves;

    alliedPossibleMoves.push(this.moveCoords);

    this.isPreview = false;
  }

  public showAvailableMoves() {
    this.setCells({ x: this.xCoord, y: this.yCoord });
    this.board.refreshCells();
  }
}
