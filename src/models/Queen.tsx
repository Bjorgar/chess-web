import queenBlack from '../assets/queen-black.png';
import queenWhite from '../assets/queen-white.png';
import { FigureData, Names } from '../types/figure';
import { Figure } from './Figure';

export class Queen extends Figure {
  side;

  constructor(side: FigureData['side']) {
    super({
      side,
      blackFigure: queenBlack,
      whiteFigure: queenWhite,
      name: Names.queen,
    });

    this.side = side;
  }
}
