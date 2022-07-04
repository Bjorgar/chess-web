/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRef, useState } from 'react';

import { useOutsideClick } from '../../hooks/useOutsideClick';
import { CellModel } from '../../models/CellModel';
import {
  blackBorder,
  cellType,
  figureImg,
  whiteBorder,
} from './Cell.css';
import { CellType } from './types';

interface Props {
  cell: CellModel;
}

export default function Cell({
  cell: {
    coords,
    figure,
    variant,
    isAvailable,
    isCastling,
    isDanger,
    board,
  },
}: Props): JSX.Element {
  const [isActive, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const border = board.turn === 'white'
    ? whiteBorder
    : blackBorder;

  let cellVariant: CellType = 'standard';

  if (isDanger) {
    cellVariant = 'danger';
  }

  if (isAvailable) {
    cellVariant = 'available';
  }

  if (isCastling) {
    cellVariant = 'castling';
  }

  function clickHandler() {
    board.clearMarks();

    if (figure && figure.side === board.turn) {
      setActive(true);
      board.setFigureData(figure, coords);
      figure.showAvailableMoves();
    }
    if (isAvailable || isCastling) {
      board.moveFigure(coords, isCastling);
    }
  }

  function inActivateCell() {
    setActive(false);
  }

  useOutsideClick({
    ref,
    isActive,
    callback: inActivateCell,
  });

  const isBorder = isActive ? border : '';

  return (
    <div
      className={[variant, isBorder, cellType[cellVariant]].join(' ')}
      onClick={clickHandler}
      ref={ref}
    >
      {figure && (
        <img
          className={figureImg}
          src={figure.image}
          alt={figure.name}
        />
      )}
    </div>
  );
}
