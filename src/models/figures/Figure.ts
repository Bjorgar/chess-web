import { BoardModel } from '../BoardModel';
import { CellModel } from '../CellModel';
import { Coords, FigureName, Side } from './types/common';

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
  }

  public setXCoord(x: number) {
    this.xCoord = x;
  }

  public setYCoord(y: number) {
    this.yCoord = y;
  }

  public setCoords({ x, y }: Coords) {
    this.xCoord = x;
    this.yCoord = y;
  }

  public addPossibleCoords(nextCell: CellModel) {
    const nextY = nextCell.coords.y;
    const nextX = nextCell.coords.x;
    const coordsTarget = this.side === 'white'
      ? this.board.whiteNextPossibleCoords
      : this.board.blackNextPossibleCoords;

    if (coordsTarget[this.name]) {
      coordsTarget[this.name].push(`${nextY}${nextX}`);
    } else {
      coordsTarget[this.name] = [`${nextY}${nextX}`];
    }
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
