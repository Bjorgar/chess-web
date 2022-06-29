import kingBlack from '../../assets/king-black.png';
import kingWhite from '../../assets/king-white.png';
import { BoardModel } from '../BoardModel';
import { Figure } from './Figure';
import { Names, Side } from './types/common';

export class King extends Figure {
  side;

  board;

  constructor(
    side: Side,
    board: BoardModel,
  ) {
    super({
      side,
      blackFigure: kingBlack,
      whiteFigure: kingWhite,
      name: Names.king,
    });

    this.side = side;
    this.board = board;
  }
}
