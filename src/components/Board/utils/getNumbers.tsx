import { mark } from '../Board.css';
import { FIELD_SIZE } from '../constants';

export function getNumbers(): React.ReactNode {
  const data = [];

  for (let i = 0; i < FIELD_SIZE; i++) {
    data.push(<div className={mark}>{i + 1}</div>);
  }

  return data;
}
