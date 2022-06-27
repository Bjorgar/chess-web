import { useMemo } from 'react';

import * as style from './Board.css';
import { getField, getLetters, getNumbers } from './utils';

export default function Board() {
  const field = useMemo(() => getField(), []);

  return (
    <div className={style.paper}>
      <div className={style.board}>
        <div className={style.numbers}>
          {getNumbers()}
        </div>
        <table className={style.table}>
          <tbody>
            {field}
          </tbody>
        </table>
        <div className={style.letters}>
          {getLetters()}
        </div>
      </div>
    </div>
  );
}
