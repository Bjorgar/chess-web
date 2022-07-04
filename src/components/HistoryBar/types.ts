import { RecordData } from '../../models/figures/types/boardModel';
import { FigureCommon } from '../../models/figures/types/figureModel';

export interface HistoryBarProps {
  side: FigureCommon['side'];
  history?: RecordData[];
}
