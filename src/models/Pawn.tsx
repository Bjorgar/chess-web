import pawnBlack from '../assets/pawn-black.png';
import pawnWhite from '../assets/pawn-white.png';
import { FigureData, Names } from '../types/figure';
import { Figure } from './Figure';

export class Pawn extends Figure {
  side;

  constructor(side: FigureData['side']) {
    super({
      side,
      blackFigure: pawnBlack,
      whiteFigure: pawnWhite,
      name: Names.pawn,
    });

    this.side = side;
  }
}
