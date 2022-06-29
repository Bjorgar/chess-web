import { useEffect, useState } from 'react';

import { BoardModel } from '../../models/BoardModel';
import { CellModel } from '../../models/CellModel';
import Cell from '../Cell/Cell';
import * as style from './Board.css';
import { getLetters, getNumbers } from './utils';

export default function Board() {
  const [cells, setCells] = useState<CellModel[][]>();

  useEffect(() => {
    const newBoard = new BoardModel(setCells);
    newBoard.initGame();
  }, []);

  return (
    <div className={style.paper}>
      <div className={style.board}>
        <div className={style.numbers}>
          {getNumbers()}
        </div>
        <div className={style.playField}>
          {cells?.map((row) => (
            row.map((cell) => (
              <Cell
                key={cell.id}
                cell={cell}
              />
            ))
          )).flat()}
        </div>
        <div className={style.letters}>
          {getLetters()}
        </div>
      </div>
    </div>
  );
}
