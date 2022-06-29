import rookBlack from '../assets/rook-black.png';
import rookWhite from '../assets/rook-white.png';
import { FigureData, Names } from '../types/figure';
import { Figure } from './Figure';

export class Rook extends Figure {
  side;

  constructor(side: FigureData['side']) {
    super({
      side,
      blackFigure: rookBlack,
      whiteFigure: rookWhite,
      name: Names.rook,
    });

    this.side = side;
  }
}
