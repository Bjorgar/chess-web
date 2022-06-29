import bishopBlack from '../assets/bishop-black.png';
import bishopWhite from '../assets/bishop-white.png';
import { FigureData, Names } from '../types/figure';
import { Figure } from './Figure';

export class Bishop extends Figure {
  side;

  constructor(side: FigureData['side']) {
    super({
      side,
      blackFigure: bishopBlack,
      whiteFigure: bishopWhite,
      name: Names.bishop,
    });

    this.side = side;
  }
}
