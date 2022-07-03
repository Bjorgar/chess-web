import { v4 as uuidV4 } from 'uuid';

import { BoardModel } from './BoardModel';
import { Coords } from './figures/types/common';
import { FigureCommon } from './figures/types/figureModel';

interface CellModelConstructor {
  coords: Coords;
  figure: FigureCommon | null;
  colorVariant: string;
  isAvailable: boolean;
  isDanger: boolean;
  board: BoardModel;
}

export class CellModel {
  coords;

  board;

  figure;

  isAvailable;

  isDanger;

  id;

  readonly variant;

  constructor({
    coords,
    figure,
    colorVariant,
    isAvailable,
    board,
    isDanger,
  }: CellModelConstructor) {
    this.variant = colorVariant;
    this.coords = coords;
    this.id = uuidV4();
    this.figure = figure;
    this.isAvailable = isAvailable;
    this.isDanger = isDanger;
    this.board = board;
  }
}
