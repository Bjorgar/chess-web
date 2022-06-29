import knightBlack from '../../assets/knight-black.png';
import knightWhite from '../../assets/knight-white.png';
import { BoardModel } from '../BoardModel';
import { Figure } from './Figure';
import { Names, Side } from './types/common';

export class Knight extends Figure {
  side;

  board;

  constructor(
    side: Side,
    board: BoardModel,
  ) {
    super({
      side,
      blackFigure: knightBlack,
      whiteFigure: knightWhite,
      name: Names.knight,
    });

    this.side = side;
    this.board = board;
  }
}
