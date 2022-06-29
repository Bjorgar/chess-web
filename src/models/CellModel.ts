import { v4 as uuidV4 } from 'uuid';

import { BoardModel } from './BoardModel';
import { Coords } from './figures/types/common';
import { FigureCommon } from './figures/types/figureModel';

interface CellModelConstructor {
  coords: Coords;
  figure: FigureCommon | null,
  colorVariant: string,
  isAvailable: boolean,
  board: BoardModel;
}

export class CellModel {
  coords;

  board;

  figure;

  isAvailable;

  id;

  readonly variant;

  constructor({
    coords,
    figure,
    colorVariant,
    isAvailable,
    board,
  }: CellModelConstructor) {
    this.variant = colorVariant;
    this.coords = coords;
    this.id = uuidV4();
    this.figure = figure;
    this.isAvailable = isAvailable;
    this.board = board;
  }
}
