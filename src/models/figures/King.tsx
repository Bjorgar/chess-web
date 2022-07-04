import kingBlack from '../../assets/king-black.png';
import kingWhite from '../../assets/king-white.png';
import { BoardModel } from '../BoardModel';
import { Figure } from './Figure';
import { Coords, FigureName, Side } from './types/common';

export class King extends Figure {
  constructor(
    side: Side,
    board: BoardModel,
    coords: Coords,
  ) {
    super({
      side,
      blackFigure: kingBlack,
      whiteFigure: kingWhite,
      name: FigureName.king,
      coords,
      board,
    });

    this.side = side;
    this.board = board;
    this.board.kings[side] = this;
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
    const team = this.board.turn === 'white'
      ? this.board.whiteTeamFigures
      : this.board.blackTeamFigures;

    const checkForEmptyCells = (y: number, name: string) => {
      const { cells } = this.board;
      const kingsCastlingMoves: Coords[] = [];

      if (
        name.includes('Right')
          && !cells[y][4].figure
          && !cells[y][5].figure
          && !cells[y][6].figure
      ) {
        kingsCastlingMoves.push({ y, x: 4 }, { y, x: 5 });
      }

      if (
        name.includes('Left')
          && !cells[y][1].figure
          && !cells[y][2].figure
      ) {
        kingsCastlingMoves.push({ y, x: 1 }, { y, x: 2 });
      }

      if (!kingsCastlingMoves.length) return;

      const isDanger = kingsCastlingMoves
        .some((move) => this.board.checkForPossibleShah({
          moveCoords: move,
          figureCoords: this.moveCoords.figureCoords,
          figure: this,
        }));

      if (!isDanger) {
        if (name.includes('Right')) {
          cells[y][5].isCastling = true;
        }
        if (name.includes('Left')) {
          cells[y][1].isCastling = true;
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

  public recordNextPossibleCoords() {
    this.moveCoords.possibleMoves = [];
    this.setCells({ x: this.xCoord, y: this.yCoord });

    const alliedTeam = this.side === 'white'
      ? this.board.whiteTeamFigures
      : this.board.blackTeamFigures;

    alliedTeam.push(this.moveCoords);
  }

  public showAvailableMoves() {
    this.moveCoords.possibleMoves = [];

    if (!this.board.isShah) {
      this.checkForCastling();
    }

    this.setCells({ x: this.xCoord, y: this.yCoord });
    this.checkAvailableMoves();
    this.board.refreshCells();
  }
}
