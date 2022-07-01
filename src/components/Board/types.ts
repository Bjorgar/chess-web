import { RecordData } from '../../models/figures/types/boardModel';

export interface MovesHistory {
  black: RecordData[];
  white: RecordData[];
}
