import { ChessManager } from '../../ChessManager';
import { ICellModel } from './cellModel';

export interface IChessBoard {
  cells: ICellModel[][];
  manager: ChessManager;
  initBoard: (iteration?: number, isChild?: boolean) => void | ICellModel[];
  initFigures: () => void;
}
