export interface Coords {
  x: number;
  y: number;
}

export enum FigureName {
  king = 'King',
  queen = 'Queen',
  bishop = 'Bishop',
  knight = 'Knight',
  rook = 'Rook',
  pawn = 'Pawn',
}

export type Side = 'black' | 'white';
