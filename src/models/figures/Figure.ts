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

  isPreview = false;

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

  public setCoords({ x, y }: Coords) {
    this.moveCoords.figureCoords = { x, y };
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
      nextCell.isAvailable = true;
      if (this.isPreview) {
        this.addPossibleCoords(nextCell);
      }
    }

    return isEmptyCell;
  }
}
