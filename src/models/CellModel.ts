import { v4 as uuidV4 } from 'uuid';

import { CellModelConstructor, ICellModel } from './figures/types/cellModel';

export class CellModel implements ICellModel {
  manager;

  figure;

  isAvailable;

  isDanger;

  isCastling;

  id;

  readonly variant;

  readonly coords;

  constructor({
    coords,
    figure,
    colorVariant,
    isAvailable,
    manager,
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
    this.manager = manager;
  }
}
