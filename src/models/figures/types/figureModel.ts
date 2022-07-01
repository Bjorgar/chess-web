import { Figure } from '../Figure';

export interface FigureCommon extends Figure {
  getAvailableCells: (preview?: boolean) => void;
}
