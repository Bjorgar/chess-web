import pawnBlack from '../../assets/pawn-black.png';
import pawnWhite from '../../assets/pawn-white.png';
import { BoardModel } from '../BoardModel';
import { Figure } from './Figure';
import { Names, Side } from './types/common';

export class Pawn extends Figure {
  side;

  board;

  constructor(
    side: Side,
    board: BoardModel,
  ) {
    super({
      side,
      blackFigure: pawnBlack,
      whiteFigure: pawnWhite,
      name: Names.pawn,
    });

    this.side = side;
    this.board = board;
  }
}
