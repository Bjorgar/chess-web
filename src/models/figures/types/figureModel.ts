import { Figure } from '../Figure';
import { Coords } from './common';

export interface FigureCommon extends Figure {
  getAvailableCells: (coords: Coords) => void;
}
