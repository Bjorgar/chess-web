import { BoardModel } from '../BoardModel';
import { CellModel } from '../CellModel';
import { MoveCoords } from './types/boardModel';
import {
  Coords, FigureName, Side,
} from './types/common';

interface FigureData {
  side: Side;
  name: FigureName;
  blackFigure: string;
  whiteFigure: string;
  coords: Coords;
  board: BoardModel;
  namePrefix?: string,
}
export class Figure {
  board;

  side;

  moves = 0;

  minCoord = 0;

  maxCoord = 7;

  yCoord = 0;

  xCoord = 0;

  moveCoords: MoveCoords = {
    name: '',
    figureCoords: { x: 0, y: 0 },
    possibleMoves: [],
  };

  readonly name;

  readonly image;

  constructor({
    side,
    blackFigure,
    whiteFigure,
    name,
    coords,
    board,
    namePrefix,
  }: FigureData) {
    this.side = side;
    this.board = board;
    this.xCoord = coords.x;
    this.yCoord = coords.y;
    this.name = namePrefix ? `${namePrefix} ${name}` : name;
    this.image = side === 'black' ? blackFigure : whiteFigure;

    this.moveCoords.figureCoords = coords;
    this.moveCoords.name = this.name;
  }

  public setXCoord(x: number) {
    this.xCoord = x;
  }

  public setYCoord(y: number) {
    this.yCoord = y;
  }

  public setCoords({ x, y }: Coords, isMovesRecordOnly?: boolean) {
    if (!isMovesRecordOnly) {
      this.moveCoords.figureCoords = { x, y };
    }
    this.xCoord = x;
    this.yCoord = y;
  }

  public addPossibleCoords(nextCell: CellModel) {
    const nextY = nextCell.coords.y;
    const nextX = nextCell.coords.x;

    this.moveCoords.possibleMoves.push(`${nextY}${nextX}`);
  }

  public checkNextCell(nextCell: CellModel) {
    const isEmptyCell = !nextCell.figure;

    if (isEmptyCell || nextCell.figure?.side !== this.side) {
      this.addPossibleCoords(nextCell);
    }

    return isEmptyCell;
  }

  public checkAvailableMoves() {
    const moves = this.moveCoords.possibleMoves;
    const figure = this.board.selectedFigure;
    const figureCoords = this.board.selectedFigureCoords as Coords;

    moves.forEach((move) => {
      const y = +move.split('')[0];
      const x = +move.split('')[1];

      const currentCell = this.board.cells[y][x];

      const isDanger = this.board.checkForPossibleShah({
        moveCoords: { x, y },
        figureCoords,
        figure,
      });

      if (isDanger) {
        currentCell.isDanger = true;
      } else {
        currentCell.isAvailable = true;
      }
    });
  }
}
