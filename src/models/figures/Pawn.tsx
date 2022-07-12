import pawnBlack from '../../assets/pawn-black.png';
import pawnWhite from '../../assets/pawn-white.png';
import { Figure } from './Figure';
import { Coords, FigureName } from './types/common';
import {
  ChessFigureCommon,
  ChessFigureData,
  ManagerNextCoords,
} from './types/figureModel';

export class Pawn extends Figure implements ChessFigureCommon {
  private isEnemyDetected = false;

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
      blackFigure: pawnBlack,
      whiteFigure: pawnWhite,
      name: FigureName.pawn,
    });
    this.figureMoveData.figure = this;
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
