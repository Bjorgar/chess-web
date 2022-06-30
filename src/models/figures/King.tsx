import kingBlack from '../../assets/king-black.png';
import kingWhite from '../../assets/king-white.png';
import { BoardModel } from '../BoardModel';
import { Figure } from './Figure';
import { Coords, Names, Side } from './types/common';

export class King extends Figure {
  side;

  board;

  constructor(
    side: Side,
    board: BoardModel,
  ) {
    super({
      side,
      blackFigure: kingBlack,
      whiteFigure: kingWhite,
      name: Names.king,
    });

    this.side = side;
    this.board = board;
  }

  private setCells({ x, y }: Coords) {
    if (y - 1 >= this.minCoord && x - 1 >= this.minCoord) {
      this.checkNextCell(
        this.board.cells[y - 1][x - 1],
        this.side,
      );
    }
    if (y - 1 >= this.minCoord && x + 1 <= this.maxCoord) {
      this.checkNextCell(
        this.board.cells[y - 1][x + 1],
        this.side,
      );
    }
    if (y + 1 <= this.maxCoord && x + 1 <= this.maxCoord) {
      this.checkNextCell(
        this.board.cells[y + 1][x + 1],
        this.side,
      );
    }
    if (y + 1 <= this.maxCoord && x - 1 >= this.minCoord) {
      this.checkNextCell(
        this.board.cells[y + 1][x - 1],
        this.side,
      );
    }
    if (y - 1 >= this.minCoord) {
      this.checkNextCell(
        this.board.cells[y - 1][x],
        this.side,
      );
    }
    if (y + 1 <= this.maxCoord) {
      this.checkNextCell(
        this.board.cells[y + 1][x],
        this.side,
      );
    }
    if (x - 1 >= this.minCoord) {
      this.checkNextCell(
        this.board.cells[y][x - 1],
        this.side,
      );
    }
    if (x + 1 <= this.maxCoord) {
      this.checkNextCell(
        this.board.cells[y][x + 1],
        this.side,
      );
    }
  }

  public getAvailableCoords(coords: Coords) {
    this.setCells(coords);

    this.board.refreshCells();
  }
}