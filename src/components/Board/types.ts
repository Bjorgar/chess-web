import { RecordData } from '../../models/figures/types/chessManagerModel';

export interface MovesHistory {
  black: RecordData[];
  white: RecordData[];
}
