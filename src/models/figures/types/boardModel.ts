import { Coords } from './common';
import { ChessFigure } from './figureModel';

export interface RecordData {
  date: number;
  prevCell: string;
  currentCell: string;
  image?: string;
}

export interface Kings {
  white: ChessFigure;
  black: ChessFigure;
}

export interface FigureMoveData {
  name: string;
  figureCoords: Coords;
  possibleMoves: string[];
}

export interface DataForMove {
  figureCoords: Coords;
  moveCoords: Coords;
  figure: ChessFigure | null;
  isPreview?: boolean;
}

export type RecordMoveData = Omit<DataForMove, 'isPreview' | 'figure'> & {
  image?: string;
}

export type VirtualMoveData = Omit<DataForMove, 'isPreview'>;

export interface TeamsFigures {
  white: FigureMoveData[];
  black: FigureMoveData[];
}
