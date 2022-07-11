import { useEffect, useState } from 'react';

import { BoardModel } from '../../models/BoardModel';
import { CellModel } from '../../models/CellModel';
import { Side } from '../../models/figures/types/common';
import Cell from '../Cell/Cell';
import HistoryBar from '../HistoryBar';
import Popup from '../Popup';
import * as style from './Board.css';
import { MovesHistory } from './types';
import { getLetters, getNumbers } from './utils';

export default function Board() {
  const [cells, setCells] = useState<CellModel[][]>();
  const [history, setHistory] = useState<MovesHistory>();
  const [turn, setTurn] = useState<Side>('white');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const newBoard = new BoardModel(
      setCells,
      setHistory,
      setTurn,
      setNotification,
    );
    newBoard.initGame();
  }, []);

  return (
    <>
      {/* <Popup notification={notification} /> */}
      <h2 className={style.turn}>Now turn is {turn}</h2>
      <div className={style.paper}>
        <HistoryBar history={history?.white} side="white" />
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
        <HistoryBar history={history?.black} side="black" />
      </div>
    </>
  );
}
