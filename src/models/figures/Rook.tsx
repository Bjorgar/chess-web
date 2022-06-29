import rookBlack from '../../assets/rook-black.png';
import rookWhite from '../../assets/rook-white.png';
import { BoardModel } from '../BoardModel';
import { Figure } from './Figure';
import { Names, Side } from './types/common';

export class Rook extends Figure {
  side;

  board;

  constructor(
    side: Side,
    board: BoardModel,
  ) {
    super({
      side,
      blackFigure: rookBlack,
      whiteFigure: rookWhite,
      name: Names.rook,
    });

    this.side = side;
    this.board = board;
  }
}
