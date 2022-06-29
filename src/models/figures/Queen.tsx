import queenBlack from '../../assets/queen-black.png';
import queenWhite from '../../assets/queen-white.png';
import { BoardModel } from '../BoardModel';
import { Figure } from './Figure';
import { Names, Side } from './types/common';

export class Queen extends Figure {
  side;

  board;

  constructor(
    side: Side,
    board: BoardModel,
  ) {
    super({
      side,
      blackFigure: queenBlack,
      whiteFigure: queenWhite,
      name: Names.queen,
    });

    this.side = side;
    this.board = board;
  }
}
