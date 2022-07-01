import { FigureCommon } from './figureModel';

export interface RecordData {
  date: () => number;
  prevCell: string;
  currentCell: string;
}

export interface PossibleMoves {
  [key: string]: string[]
}

export interface Kings {
  white: FigureCommon;
  black: FigureCommon;
}
