import knightBlack from '../../assets/knight-black.png';
import knightWhite from '../../assets/knight-white.png';
import { Figure } from './Figure';
import { Coords, FigureName } from './types/common';
import { ChessFigureCommon, ChessFigureData } from './types/figureModel';

export class Knight extends Figure implements ChessFigureCommon {
  private nextX = 0;

  private nextY = 0;

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
      blackFigure: knightBlack,
      whiteFigure: knightWhite,
      name: FigureName.knight,
    });
    this.figureMoveData.figure = this;
  }

  private setAvailableCell() {
    const nextCell = this.board.cells[this.nextY][this.nextX];
    this.checkNextCell(nextCell);
  }

  private setCells({ x, y }: Coords) {
    if (y - 2 >= this.minCoord) {
      if (x + 1 <= this.maxCoord) {
        this.nextY = y - 2;
        this.nextX = x + 1;
        this.setAvailableCell();
      }
      if (x - 1 >= this.minCoord) {
        this.nextY = y - 2;
        this.nextX = x - 1;
        this.setAvailableCell();
      }
    }

    if (y + 2 <= this.maxCoord) {
      if (x + 1 <= this.maxCoord) {
        this.nextY = y + 2;
        this.nextX = x + 1;
        this.setAvailableCell();
      }
      if (x - 1 >= this.minCoord) {
        this.nextY = y + 2;
        this.nextX = x - 1;
        this.setAvailableCell();
      }
    }

    if (x - 2 >= this.minCoord) {
      if (y + 1 <= this.maxCoord) {
        this.nextX = x - 2;
        this.nextY = y + 1;
        this.setAvailableCell();
      }
      if (y - 1 >= this.minCoord) {
        this.nextX = x - 2;
        this.nextY = y - 1;
        this.setAvailableCell();
      }
    }

    if (x + 2 <= this.maxCoord) {
      if (y + 1 <= this.maxCoord) {
        this.nextX = x + 2;
        this.nextY = y + 1;
        this.setAvailableCell();
      }
      if (y - 1 >= this.minCoord) {
        this.nextX = x + 2;
        this.nextY = y - 1;
        this.setAvailableCell();
      }
    }
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
