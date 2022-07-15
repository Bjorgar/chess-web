import rookBlack from '../../assets/rook-black.png';
import rookWhite from '../../assets/rook-white.png';
import { Figure } from './Figure';
import { Coords, FigureName } from './types/common';
import { ChessFigureCommon, ChessFigureData } from './types/figureModel';

export class Rook extends Figure implements ChessFigureCommon {
  private isAvailableHorizontal = true;

  private isAvailableVertical = true;

  constructor({
    side,
    board,
    coords,
    manager,
    namePrefix,
  }: ChessFigureData) {
    super({
      side,
      board,
      coords,
      manager,
      namePrefix,
      blackFigure: rookBlack,
      whiteFigure: rookWhite,
      name: FigureName.rook,
    });
    this.figureMoveData.figure = this;
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

  private setCellsHandler = () => {
    this.setCells({ x: this.xCoord, y: this.yCoord });
  };

  public recordAvailableMoves() {
    this.recordNextPossibleMoves(this.setCellsHandler);
  }

  public showAvailableMoves() {
    this.showAvailableCells(this.setCellsHandler);
  }
}
