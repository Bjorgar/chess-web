import kingBlack from '../../assets/king-black.png';
import kingWhite from '../../assets/king-white.png';
import { Figure } from './Figure';
import { Coords, FigureName } from './types/common';
import { ChessFigureCommon, ChessFigureData } from './types/figureModel';

export class King extends Figure implements ChessFigureCommon {
  constructor({
    side,
    board,
    coords,
    manager,
  }: ChessFigureData) {
    super({
      side,
      board,
      coords,
      manager,
      blackFigure: kingBlack,
      whiteFigure: kingWhite,
      name: FigureName.king,
    });
    this.manager.kings[side] = this;
    this.figureMoveData.figure = this;
  }

  private setCells({ x, y }: Coords) {
    if (y - 1 >= this.minCoord && x - 1 >= this.minCoord) {
      this.checkNextCell(this.board.cells[y - 1][x - 1]);
    }
    if (y - 1 >= this.minCoord && x + 1 <= this.maxCoord) {
      this.checkNextCell(this.board.cells[y - 1][x + 1]);
    }
    if (y + 1 <= this.maxCoord && x + 1 <= this.maxCoord) {
      this.checkNextCell(this.board.cells[y + 1][x + 1]);
    }
    if (y + 1 <= this.maxCoord && x - 1 >= this.minCoord) {
      this.checkNextCell(this.board.cells[y + 1][x - 1]);
    }
    if (y - 1 >= this.minCoord) {
      this.checkNextCell(this.board.cells[y - 1][x]);
    }
    if (y + 1 <= this.maxCoord) {
      this.checkNextCell(this.board.cells[y + 1][x]);
    }
    if (x - 1 >= this.minCoord) {
      this.checkNextCell(this.board.cells[y][x - 1]);
    }
    if (x + 1 <= this.maxCoord) {
      this.checkNextCell(this.board.cells[y][x + 1]);
    }
  }

  public checkForCastling() {
    const team = this.manager.teamFigures[this.manager.turn];

    const checkForEmptyCells = (y: number, name: string) => {
      const { cells } = this.board;
      const kingsCastlingMoves: Coords[] = [];

      if (
        name.includes('Right')
          && !cells[y][5].figure
          && !cells[y][6].figure
      ) {
        kingsCastlingMoves.push({ y, x: 5 }, { y, x: 6 });
      }

      if (
        name.includes('Left')
          && !cells[y][1].figure
          && !cells[y][2].figure
          && !cells[y][3].figure
      ) {
        kingsCastlingMoves.push({ y, x: 2 }, { y, x: 3 });
      }

      if (!kingsCastlingMoves.length) return;

      const isDanger = kingsCastlingMoves
        .some((move) => this.manager.checkForPossibleShah({
          moveCoords: move,
          figureCoords: this.figureMoveData.figureCoords,
          figure: this,
        }));

      if (!isDanger) {
        if (name.includes('Right')) {
          cells[y][6].isCastling = true;
        }
        if (name.includes('Left')) {
          cells[y][2].isCastling = true;
        }
      }
    };

    if (this.moves === 0) {
      const rooks = team.filter((figureData) => (
        figureData.name.includes(FigureName.rook)
      ));

      rooks.forEach(({ figureCoords: { x, y } }) => {
        const rook = this.board.cells[y][x].figure;
        if (rook?.moves === 0) {
          checkForEmptyCells(y, rook.name);
        }
      });
    }
  }

  public recordAvailableMoves() {
    this.recordNextPossibleMoves(() => {
      this.setCells({ x: this.xCoord, y: this.yCoord });
    });
  }

  public showAvailableMoves() {
    this.showAvailableCells(() => {
      if (!this.manager.isShah) {
        this.checkForCastling();
      }
      this.setCells({ x: this.xCoord, y: this.yCoord });
    });
  }
}
