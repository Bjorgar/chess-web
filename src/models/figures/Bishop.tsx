import bishopBlack from '../../assets/bishop-black.png';
import bishopWhite from '../../assets/bishop-white.png';
import { Figure } from './Figure';
import { FigureName } from './types/common';
import { ChessFigureCommon, ChessFigureData } from './types/figureModel';

export class Bishop extends Figure implements ChessFigureCommon {
  private xLeftCoord = 0;

  private xRightCoord = 0;

  private isAvailableRDiagonal = true;

  private isAvailableLDiagonal = true;

  private isAvailableCalculation = true;

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
      blackFigure: bishopBlack,
      whiteFigure: bishopWhite,
      name: FigureName.bishop,
    });

    this.side = side;
    this.manager = manager;
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
      this.isAvailableLDiagonal = this.checkNextCell(nextCell);
    }

    if (this.xRightCoord < this.maxCoord && this.isAvailableRDiagonal) {
      const nextCell = this.board.cells[this.yCoord][++this.xRightCoord];
      this.isAvailableRDiagonal = this.checkNextCell(nextCell);
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

  private setCellsHandler = () => {
    this.setCells(this.yCoord);
  };

  public recordMoves() {
    this.recordNextPossibleMoves(this.setCellsHandler);
  }

  public showAvailableMoves() {
    this.showAvailableCells(this.setCellsHandler);
  }
}
