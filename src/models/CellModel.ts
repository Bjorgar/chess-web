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
  isCastling: boolean;
  board: BoardModel;
}

export class CellModel {
  coords;

  board;

  figure;

  isAvailable;

  isDanger;

  isCastling;

  id;

  readonly variant;

  constructor({
    coords,
    figure,
    colorVariant,
    isAvailable,
    board,
    isDanger,
    isCastling,
  }: CellModelConstructor) {
    this.variant = colorVariant;
    this.coords = coords;
    this.id = uuidV4();
    this.figure = figure;
    this.isAvailable = isAvailable;
    this.isDanger = isDanger;
    this.isCastling = isCastling;
    this.board = board;
  }
}
