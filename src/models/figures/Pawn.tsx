import pawnBlack from '../../assets/pawn-black.png';
import pawnWhite from '../../assets/pawn-white.png';
import { BoardModel } from '../BoardModel';
import { Figure } from './Figure';
import { Coords, FigureName, Side } from './types/common';

interface ManagerNextCoords {
  nextLCoord: number;
  nextRCoord: number;
  nextYCoord: number;
}

export class Pawn extends Figure {
  private isEnemyDetected = false;

  constructor(
    side: Side,
    board: BoardModel,
    coords: Coords,
    namePrefix: string,
  ) {
    super({
      side,
      blackFigure: pawnBlack,
      whiteFigure: pawnWhite,
      name: FigureName.pawn,
      coords,
      board,
      namePrefix,
    });

    this.side = side;
    this.board = board;
  }

  private checkCell({ x, y }: Coords) {
    const cell = this.board.cells[y][x];
    const isFully = cell.figure;

    if (isFully && cell.figure?.side !== this.side) {
      this.isEnemyDetected = true;
      this.addPossibleCoords(cell);
    }
  }

  private manageCellCheck({
    nextLCoord,
    nextRCoord,
    nextYCoord,
  }: ManagerNextCoords) {
    if (nextLCoord >= this.minCoord) {
      this.checkCell({ x: nextLCoord, y: nextYCoord });
    }
    if (nextRCoord <= this.maxCoord) {
      this.checkCell({ x: nextRCoord, y: nextYCoord });
    }
  }

  private checkEnemies({ x, y }: Coords) {
    const nextYCoord = this.side === 'white'
      ? y - 1
      : y + 1;

    const nextLCoord = x - 1;
    const nextRCoord = x + 1;

    if (this.side === 'white' && nextYCoord >= this.minCoord) {
      this.manageCellCheck({ nextLCoord, nextRCoord, nextYCoord });
    }

    if (this.side === 'black' && nextYCoord <= this.maxCoord) {
      this.manageCellCheck({ nextLCoord, nextRCoord, nextYCoord });
    }
  }

  private setCells({ x, y }: Coords) {
    this.checkEnemies({ x, y });

    if (!this.isEnemyDetected) {
      let step = this.moves
        ? 1
        : 2;

      const border = this.side === 'white'
        ? this.minCoord
        : this.maxCoord;

      while (step && y !== border) {
        step--;
        const nextYCoord = this.side === 'white'
          ? --this.yCoord
          : ++this.yCoord;

        const nextCell = this.board.cells[nextYCoord][x];

        if (!nextCell.figure) {
          this.addPossibleCoords(nextCell);
        } else {
          step = 0;
        }
      }
    }

    this.setYCoord(y);
    this.isEnemyDetected = false;
  }

  public recordNextPossibleCoords() {
    this.moveCoords.possibleMoves = [];
    this.setCells({ x: this.xCoord, y: this.yCoord });

    const alliedPossibleMoves = this.side === 'white'
      ? this.board.whiteNextPossibleMoves
      : this.board.blackNextPossibleMoves;

    alliedPossibleMoves.push(this.moveCoords);
  }

  public showAvailableMoves() {
    this.moveCoords.possibleMoves = [];
    this.setCells({ x: this.xCoord, y: this.yCoord });
    this.checkAvailableMoves();
    this.board.refreshCells();
  }
}
