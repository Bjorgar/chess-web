import bishopBlack from '../../assets/bishop-black.png';
import bishopWhite from '../../assets/bishop-white.png';
import { BoardModel } from '../BoardModel';
import { Figure } from './Figure';
import { Coords, FigureName, Side } from './types/common';

export class Bishop extends Figure {
  private xLeftCoord = 0;

  private xRightCoord = 0;

  private isAvailableRDiagonal = true;

  private isAvailableLDiagonal = true;

  private isAvailableCalculation = true;

  constructor(
    side: Side,
    board: BoardModel,
    coords: Coords,
    namePrefix: string,
  ) {
    super({
      side,
      blackFigure: bishopBlack,
      whiteFigure: bishopWhite,
      name: FigureName.bishop,
      coords,
      board,
      namePrefix,
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

  public recordNextPossibleCoords() {
    this.moveCoords.possibleMoves = [];
    this.setCells(this.yCoord);

    const alliedTeam = this.board.teamFigures[this.side];

    alliedTeam.push(this.moveCoords);
  }

  public showAvailableMoves() {
    this.moveCoords.possibleMoves = [];
    this.setCells(this.yCoord);
    this.checkAvailableMoves();
    this.board.refreshCells();
  }
}
