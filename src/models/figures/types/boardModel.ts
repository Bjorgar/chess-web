export interface RecordData {
  date: () => number;
  prevCell: string;
  currentCell: string;
}

export interface PossibleMoves {
  [key: string]: string[]
}
