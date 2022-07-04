import { FigureCommon } from '../../../models/figures/types/figureModel';
import { blackBorder, cellCursor, whiteBorder } from '../Cell.css';
import { CellType } from '../types';

interface SetStylesData {
  turn: FigureCommon['side'];
  figure: FigureCommon | null;
  isDanger: boolean;
  isAvailable: boolean;
  isCastling: boolean;
  isActive: boolean;
}

interface Result {
  border: string;
  cursorType: string;
  cellVariant: CellType;
  borderStyle: string;
}

export function setStyles({
  turn,
  figure,
  isDanger,
  isCastling,
  isAvailable,
  isActive,
}: SetStylesData): Result {
  const border = turn === 'white'
    ? whiteBorder
    : blackBorder;

  const borderStyle = isActive ? border : '';

  let cellVariant: CellType = 'standard';

  const cursorType = !!figure && figure.side === turn
    ? cellCursor.pointer
    : cellCursor.default;

  if (isDanger) {
    cellVariant = 'danger';
  }

  if (isAvailable) {
    cellVariant = 'available';
  }

  if (isCastling) {
    cellVariant = 'castling';
  }

  return {
    border,
    cursorType,
    cellVariant,
    borderStyle,
  };
}
