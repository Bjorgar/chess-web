import { BoardModel } from '../BoardModel';
import { CellModel } from '../CellModel';
import { Coords, Names, Side } from './types/common';

interface FigureData {
  side: Side;
  name: Names;
  blackFigure: string;
  whiteFigure: string;
  coords: Coords;
  board: BoardModel;
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
  }: FigureData) {
    this.side = side;
    this.board = board;
    this.xCoord = coords.x;
    this.yCoord = coords.y;
    this.name = `${side}${name}`;
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

  public checkNextCell(nextCell: CellModel, side: FigureData['side']) {
    const isEmptyCell = !nextCell.figure;

    if (isEmptyCell || nextCell.figure?.side !== side) {
      nextCell.isAvailable = true;
    }

    return isEmptyCell;
  }
}
