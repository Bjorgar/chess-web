import { ChessBoard } from '../../ChessBoard';
import { Coords, Side } from './common';
import { ChessFigure, FigureMoveData } from './figureModel';

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

export interface IChessManager {
  turn: Side;
  selectedFigure: ChessFigure | null;
  selectedFigureCoords: Coords | null;
  savedEnemyFigure: ChessFigure | null;
  blackDestroyedFigures: ChessFigure[];
  whiteDestroyedFigures: ChessFigure[];
  blackRecordedMoves: RecordData[];
  whiteRecordedMoves: RecordData[];
  teamFigures: TeamsFigures;
  kings: Kings;
  isShah: boolean;
  board: ChessBoard;
  checkForPossibleShah: (data: VirtualMoveData) => boolean;
  checkForShah: (data: Side) => boolean;
  moveFigure: (coords: Coords, isCastling: boolean) => void;
  clearMarks: () => void;
  setFigureData: (figure: ChessFigure, coords: Coords) => void;
  refreshCells: () => void;
}
