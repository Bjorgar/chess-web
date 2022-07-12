import { IChessManager } from './chessManagerModel';
import { Coords } from './common';
import { ChessFigure } from './figureModel';

export interface CellModelConstructor {
  coords: Coords;
  figure: ChessFigure | null;
  colorVariant: string;
  isAvailable: boolean;
  isDanger: boolean;
  isCastling: boolean;
  manager: IChessManager;
}

export interface ICellModel {
  coords: Coords;
  manager: IChessManager;
  figure: ChessFigure | null;
  isAvailable: boolean;
  isDanger: boolean;
  isCastling: boolean;
  id: string;
  variant: string;
}
