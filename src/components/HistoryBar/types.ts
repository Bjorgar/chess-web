import { RecordData } from '../../models/figures/types/boardModel';
import { Side } from '../../models/figures/types/common';

export interface HistoryBarProps {
  side: Side;
  history?: RecordData[];
}
