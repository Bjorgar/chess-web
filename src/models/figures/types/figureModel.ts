import { Figure } from '../Figure';

export interface FigureCommon extends Figure {
  showAvailableMoves: () => void;
  recordNextPossibleCoords: () => void;
}
