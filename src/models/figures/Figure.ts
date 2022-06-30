import { CellModel } from '../CellModel';
import { Coords, Names, Side } from './types/common';

interface FigureData {
  side: Side;
  name: Names;
  blackFigure: string;
  whiteFigure: string;
}

export class Figure {
  side;

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
  }: FigureData) {
    this.side = side;
    this.name = `${side}${name}`;
    this.image = side === 'black' ? blackFigure : whiteFigure;
  }

  public setDefaultValues({ x, y }: Coords, additionalAction?: () => void) {
    this.xCoord = x;
    this.yCoord = y;

    additionalAction?.();
  }

  public setXCoord(x: number) {
    this.xCoord = x;
  }

  public setYCoord(y: number) {
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
