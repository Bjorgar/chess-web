import { mark } from '../Board.css';
import { BOARD_NUMBERS } from '../constants';

export function getNumbers(): React.ReactNode {
  const data = [];

  for (let i = 0; i < BOARD_NUMBERS.length; i++) {
    data.push(<div className={mark}>{BOARD_NUMBERS[i]}</div>);
  }

  return data;
}
