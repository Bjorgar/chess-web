import rookBlack from '../../assets/rook-black.png';
import rookWhite from '../../assets/rook-white.png';
import { BoardModel } from '../BoardModel';
import { Figure } from './Figure';
import { Coords, Names, Side } from './types/common';

export class Rook extends Figure {
  private isAvailableHorizontal = true;

  private isAvailableVertical = true;

  constructor(
    side: Side,
    board: BoardModel,
    coords: Coords,
  ) {
    super({
      side,
      blackFigure: rookBlack,
      whiteFigure: rookWhite,
      name: Names.rook,
      coords,
      board,
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
      this.isAvailableHorizontal = this.checkNextCell(nextCell, this.side);
    }

    this.resetHorizontal(x);

    while (this.xCoord !== this.maxCoord && this.isAvailableHorizontal) {
      const nextCell = this.board.cells[this.yCoord][++this.xCoord];
      this.isAvailableHorizontal = this.checkNextCell(nextCell, this.side);
    }

    this.resetHorizontal(x);
  }

  private setVerticalCells(y: number) {
    while (this.yCoord !== this.minCoord && this.isAvailableVertical) {
      const nextCell = this.board.cells[--this.yCoord][this.xCoord];
      this.isAvailableVertical = this.checkNextCell(nextCell, this.side);
    }

    this.resetVertical(y);

    while (this.yCoord !== this.maxCoord && this.isAvailableVertical) {
      const nextCell = this.board.cells[++this.yCoord][this.xCoord];
      this.isAvailableVertical = this.checkNextCell(nextCell, this.side);
    }

    this.resetVertical(y);
  }

  private setCells({ x, y }: Coords) {
    this.setHorizontalCells(x);
    this.setVerticalCells(y);
  }

  public getAvailableCells(preview?: boolean) {
    if (preview) {
      this.isPreview = preview;
    }

    this.setCells({ x: this.xCoord, y: this.yCoord });

    this.isPreview = false;
    this.board.refreshCells();
  }
}
