import * as style from './HistoryBar.css';
import { HistoryBarProps } from './types';

export default function HistoryBar({ side, history }: HistoryBarProps) {
  return (
    <div className={style.historyWrapper}>
      <h2 className={style.header}>History {side}</h2>
      <div className={style.history}>
        {
          history && (
            <ul className={style.list}>
              {history.map(({
                // Add showing images
                date, currentCell, prevCell, image,
              }) => (
                <li className={style.listItem}>
                  {new Date(date).toLocaleTimeString()}: {prevCell} &gt; {currentCell}
                </li>
              ))}
            </ul>
          )
        }
      </div>
    </div>
  );
}
