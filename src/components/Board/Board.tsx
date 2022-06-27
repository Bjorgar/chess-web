import { useMemo } from 'react';

import * as style from './Board.css';
import { getField } from './utils/getField';

export default function Board() {
  const field = useMemo(() => getField(), []);

  return (
    <div className={style.board}>
      <table className={style.table}>
        <tbody>
          {field}
        </tbody>
      </table>
    </div>
  );
}
