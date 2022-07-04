import knightBlack from '../../assets/knight-black.png';
import knightWhite from '../../assets/knight-white.png';
import { BoardModel } from '../BoardModel';
import { Figure } from './Figure';
import { Coords, FigureName, Side } from './types/common';

export class Knight extends Figure {
  private nextX = 0;

  private nextY = 0;

  constructor(
    side: Side,
    board: BoardModel,
    coords: Coords,
    namePrefix: string,
  ) {
    super({
      side,
      blackFigure: knightBlack,
      whiteFigure: knightWhite,
      name: FigureName.knight,
      coords,
      board,
      namePrefix,
    });

    this.side = side;
    this.board = board;
  }

  private setAvailableCells() {
    const nextCell = this.board.cells[this.nextY][this.nextX];
    this.checkNextCell(nextCell);
  }

  private setAvailableCoords({ x, y }: Coords) {
    if (y - 2 >= this.minCoord) {
      if (x + 1 <= this.maxCoord) {
        this.nextY = y - 2;
        this.nextX = x + 1;
        this.setAvailableCells();
      }
      if (x - 1 >= this.minCoord) {
        this.nextY = y - 2;
        this.nextX = x - 1;
        this.setAvailableCells();
      }
    }

    if (y + 2 <= this.maxCoord) {
      if (x + 1 <= this.maxCoord) {
        this.nextY = y + 2;
        this.nextX = x + 1;
        this.setAvailableCells();
      }
      if (x - 1 >= this.minCoord) {
        this.nextY = y + 2;
        this.nextX = x - 1;
        this.setAvailableCells();
      }
    }

    if (x - 2 >= this.minCoord) {
      if (y + 1 <= this.maxCoord) {
        this.nextX = x - 2;
        this.nextY = y + 1;
        this.setAvailableCells();
      }
      if (y - 1 >= this.minCoord) {
        this.nextX = x - 2;
        this.nextY = y - 1;
        this.setAvailableCells();
      }
    }

    if (x + 2 <= this.maxCoord) {
      if (y + 1 <= this.maxCoord) {
        this.nextX = x + 2;
        this.nextY = y + 1;
        this.setAvailableCells();
      }
      if (y - 1 >= this.minCoord) {
        this.nextX = x + 2;
        this.nextY = y - 1;
        this.setAvailableCells();
      }
    }
  }

  public recordNextPossibleCoords() {
    this.moveCoords.possibleMoves = [];
    this.setAvailableCoords({ x: this.xCoord, y: this.yCoord });

    const alliedTeam = this.side === 'white'
      ? this.board.whiteTeamFigures
      : this.board.blackTeamFigures;

    alliedTeam.push(this.moveCoords);
  }

  public showAvailableMoves() {
    this.moveCoords.possibleMoves = [];
    this.setAvailableCoords({ x: this.xCoord, y: this.yCoord });
    this.checkAvailableMoves();
    this.board.refreshCells();
  }
}
