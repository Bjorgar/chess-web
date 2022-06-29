/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRef, useState } from 'react';

import { useOutsideClick } from '../../hooks/useOutsideClick';
import { CellModel } from '../../models/CellModel';
import { border, bright, figureImg } from './Cell.css';

interface Props {
  cell: CellModel;
}

export default function Cell({
  cell: {
    x,
    y,
    figure,
    variant,
    isAvailable,
  },
}: Props): JSX.Element {
  const [isActive, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function clickHandler() {
    setActive(true);
    if (figure) {
      figure.clearMarks?.();
      figure.getAvailableCoords?.({ x, y });
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

  const isBorder = isActive ? border.active : border.inactive;
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
