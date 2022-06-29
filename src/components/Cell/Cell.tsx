/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useRef, useState } from 'react';

import { useOutsideClick } from '../../hooks/useOutsideClick';
import { CellModel } from '../../models/CellModel';
import { border, figure } from './Cell.css';

interface Props {
  cell: CellModel;
}

export default function Cell({ cell }: Props): JSX.Element {
  const [isActive, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function clickHandler() {
    setActive(true);
    console.log(cell.x);
    console.log(cell.y);
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

  return (
    <div
      className={[cell.variant, isBorder].join(' ')}
      onClick={clickHandler}
      ref={ref}
    >
      {cell.figure && (
        <img className={figure} src={cell.figure?.image} alt="" />
      )}
    </div>
  );
}
