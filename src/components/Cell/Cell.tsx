/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRef, useState } from 'react';

import { useOutsideClick } from '../../hooks/useOutsideClick';
import { CellModel } from '../../models/CellModel';
import {
  blackBorder,
  bright,
  figureImg,
  whiteBorder,
} from './Cell.css';

interface Props {
  cell: CellModel;
}

export default function Cell({
  cell: {
    coords,
    figure,
    variant,
    isAvailable,
    board,
  },
}: Props): JSX.Element {
  const [isActive, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const border = board.turn === 'white'
    ? whiteBorder
    : blackBorder;

  function clickHandler() {
    board.clearMarks();

    if (figure && figure.side === board.turn) {
      setActive(true);
      board.setFigureData(figure, coords);
      figure.showAvailableMoves();
    }
    if (isAvailable) {
      board.moveFigure(coords);
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
  const isBright = isAvailable ? bright : '';

  return (
    <div
      className={[variant, isBorder, isBright].join(' ')}
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
