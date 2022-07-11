import { BoardModel } from '../../BoardModel';
import { CellModel } from '../../CellModel';
import { Figure } from '../Figure';
import { FigureMoveData } from './boardModel';
import { Coords, FigureName, Side } from './common';

// For Pawn
export interface ManagerNextCoords {
  nextLCoord: number;
  nextRCoord: number;
  nextYCoord: number;
}

export interface IFigure {
  board: BoardModel;
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
  board: BoardModel;
  namePrefix?: string,
}

export interface FigureData extends ChessFigureData {
  name: FigureName;
  blackFigure: string;
  whiteFigure: string;
}

export interface ChessFigureCommon {
  recordMoves: () => void;
  showAvailableMoves: () => void;
}

export type ChessFigure = Figure & ChessFigureCommon;
