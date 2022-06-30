import { mark } from '../Board.css';
import { BOARD_LETTERS } from '../constants';

export function getLetters(): React.ReactNode {
  return BOARD_LETTERS.map(
    (letter) => <div className={mark}>{letter}</div>,
  );
}
