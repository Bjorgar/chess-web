import knightBlack from '../assets/knight-black.png';
import knightWhite from '../assets/knight-white.png';
import { FigureData, Names } from '../types/figure';
import { Figure } from './Figure';

export class Knight extends Figure {
  side;

  constructor(side: FigureData['side']) {
    super({
      side,
      blackFigure: knightBlack,
      whiteFigure: knightWhite,
      name: Names.knight,
    });

    this.side = side;
  }
}
