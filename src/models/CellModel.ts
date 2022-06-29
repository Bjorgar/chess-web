import { v4 as uuidV4 } from 'uuid';

import { FigureCommon } from './figures/types/figureModel';

interface CellModelConstructor {
  x: number,
  y: number,
  figure: FigureCommon | null,
  colorVariant: string,
  isAvailable: boolean,
}

export class CellModel {
  readonly x;

  readonly y;

  readonly variant;

  figure;

  isAvailable;

  id;

  constructor({
    x,
    y,
    figure,
    colorVariant,
    isAvailable,
  }: CellModelConstructor) {
    this.variant = colorVariant;
    this.x = x;
    this.y = y;
    this.id = uuidV4();
    this.figure = figure;
    this.isAvailable = isAvailable;
  }
}
