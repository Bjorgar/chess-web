import { CellModel } from '../../CellModel';
import { IChessBoard } from './chessBoardModel';
import { IChessManager } from './chessManagerModel';
import { Coords, FigureName, Side } from './common';

// For Pawn
export interface ManagerNextCoords {
  nextLCoord: number;
  nextRCoord: number;
  nextYCoord: number;
}

export interface FigureMoveData {
  // eslint-disable-next-line no-use-before-define
  figure: ChessFigure;
  name: string;
  figureCoords: Coords;
  possibleMoves: string[];
}

export interface IFigure {
  manager: IChessManager;
  side: Side;
  moves: number;
  minCoord: number;
  maxCoord: number;
  yCoord: number;
  xCoord: number;
  figureMoveData: FigureMoveData;
  name: string;
  image: string;
  setXCoord: (x: number) => void;
  setYCoord: (y: number) => void;
  setCoords: (coords: Coords, isMovesRecordOnly?: boolean) => void;
  addPossibleCoords: (nextCell: CellModel) => void;
  checkNextCell: (nextCell: CellModel) => boolean;
  checkAvailableMoves: () => void;
  recordNextPossibleMoves: (setCells: () => void) => void;
  showAvailableCells: (setCells: () => void) => void;
}

export interface ChessFigureData {
  side: Side;
  coords: Coords;
  manager: IChessManager;
  board: IChessBoard;
  namePrefix?: string,
}

export interface FigureData extends ChessFigureData {
  name: FigureName;
  blackFigure: string;
  whiteFigure: string;
}

export interface ChessFigureCommon {
  recordAvailableMoves: () => void;
  showAvailableMoves: () => void;
}

export type ChessFigure = IFigure & ChessFigureCommon;
