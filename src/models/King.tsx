import kingBlack from '../assets/king-black.png';
import kingWhite from '../assets/king-white.png';
import { FigureData, Names } from '../types/figure';
import { Figure } from './Figure';

export class King extends Figure {
  side;

  constructor(side: FigureData['side']) {
    super({
      side,
      blackFigure: kingBlack,
      whiteFigure: kingWhite,
      name: Names.king,
    });

    this.side = side;
  }
}
