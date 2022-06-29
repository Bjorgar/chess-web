import { v4 as uuidV4 } from 'uuid';

import { Figure } from './Figure';

interface CellModelConstructor {
  x: number,
  y: number,
  figure: Figure | null,
  colorVariant: string,
}

export class CellModel {
  readonly x;

  readonly y;

  readonly variant;

  figure;

  available;

  id;

  constructor({
    x,
    y,
    figure,
    colorVariant,
  }: CellModelConstructor) {
    this.variant = colorVariant;
    this.x = x;
    this.y = y;
    this.id = uuidV4();
    this.figure = figure;
  }
}
