import { Figure } from '../Figure';
import { Coords } from './common';

export interface FigureCommon extends Figure {
  getAvailableCoords?: (coords: Coords) => void;
  clearMarks?: () => void;
}
