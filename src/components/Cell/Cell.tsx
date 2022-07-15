/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRef, useState } from 'react';

import { useOutsideClick } from '../../hooks/useOutsideClick';
import { ICellModel } from '../../models/figures/types/cellModel';
import {
  cellType,
  figureImg,
} from './Cell.css';
import { setStyles } from './utils/setStyles';

interface Props {
  cell: ICellModel;
}

export default function Cell({
  cell: {
    coords,
    figure,
    variant,
    isAvailable,
    isCastling,
    isDanger,
    manager,
  },
}: Props): JSX.Element {
  const [isActive, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { turn } = manager;

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
    manager.clearMarks();

    if (figure && figure.side === manager.turn) {
      setActive(true);
      manager.setFigureData(figure, coords);
      figure.showAvailableMoves();
    }
    if (isAvailable || isCastling) {
      manager.moveFigure(coords, isCastling);
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
