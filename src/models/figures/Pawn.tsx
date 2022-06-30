import pawnBlack from '../../assets/pawn-black.png';
import pawnWhite from '../../assets/pawn-white.png';
import { BoardModel } from '../BoardModel';
import { Figure } from './Figure';
import { Coords, Names, Side } from './types/common';

export class Pawn extends Figure {
  side;

  board;

  private isEnemyDetected = false;

  constructor(
    side: Side,
    board: BoardModel,
  ) {
    super({
      side,
      blackFigure: pawnBlack,
      whiteFigure: pawnWhite,
      name: Names.pawn,
    });

    this.side = side;
    this.board = board;
  }

  private checkCell({ x, y }: Coords) {
    const cell = this.board.cells[y][x];
    const isFully = cell.figure;

    if (isFully && cell.figure?.side !== this.side) {
      cell.isAvailable = true;
      this.isEnemyDetected = true;
    }
  }

  private checkEnemies({ x, y }: Coords) {
    const nextYCoord = this.side === 'white'
      ? y - 1
      : y + 1;

    const nextLCoord = x - 1;
    const nextRCoord = x + 1;

    if (this.side === 'white' && nextYCoord !== this.minCoord) {
      if (nextLCoord !== this.minCoord) {
        this.checkCell({ x: nextLCoord, y: nextYCoord });
      }
      if (nextRCoord !== this.maxCoord) {
        this.checkCell({ x: nextRCoord, y: nextYCoord });
      }
    }

    if (this.side === 'black' && nextYCoord !== this.maxCoord) {
      if (nextLCoord !== this.minCoord) {
        this.checkCell({ x: nextLCoord, y: nextYCoord });
      }
      if (nextRCoord !== this.maxCoord) {
        this.checkCell({ x: nextRCoord, y: nextYCoord });
      }
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
          nextCell.isAvailable = true;
        } else {
          step = 0;
        }
      }
    }
  }

  public getAvailableCoords(coords: Coords) {
    this.setDefaultValues(coords);
    this.setCells(coords);
    this.board.refreshCells();
  }
}
