export enum Names {
  king = 'King',
  queen = 'Queen',
  bishop = 'Bishop',
  knight = 'Knight',
  rook = 'Rook',
  pawn = 'Pawn',
}

export interface FigureData {
  side: 'black' | 'white';
  blackFigure: string;
  whiteFigure: string;
  name: Names;
}
