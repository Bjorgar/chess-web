import { mark } from '../Board.css';
import { LETTERS } from '../constants';

export function getLetters(): React.ReactNode {
  return LETTERS.map(
    (letter) => <div className={mark}>{letter}</div>,
  );
}
