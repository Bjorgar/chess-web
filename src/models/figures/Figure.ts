import { Names, Side } from './types/common';

interface FigureData {
  side: Side;
  name: Names;
  blackFigure: string;
  whiteFigure: string;
}

export class Figure {
  side;

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
}
