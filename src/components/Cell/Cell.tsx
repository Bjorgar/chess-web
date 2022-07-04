/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRef, useState } from 'react';

import { useOutsideClick } from '../../hooks/useOutsideClick';
import { CellModel } from '../../models/CellModel';
import {
  cellType,
  figureImg,
} from './Cell.css';
import { setStyles } from './utils/setStyles';

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

  const { turn } = board;

  const {
    borderStyle,
    cellVariant,
    cursorType,
  } = setStyles({
    figure,
    isAvailable,
    isCastling,
    isDanger,
    turn,
    isActive,
  });

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

  return (
    <div
      className={[
        cursorType,
        variant,
        borderStyle,
        cellType[cellVariant],
      ].join(' ')}
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
