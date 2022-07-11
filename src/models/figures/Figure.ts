import { CellModel } from '../CellModel';
import { FigureMoveData } from './types/boardModel';
import { Coords } from './types/common';
import { FigureData, IFigure } from './types/figureModel';

export class Figure implements IFigure {
  board;

  side;

  moves = 0;

  minCoord = 0;

  maxCoord = 7;

  yCoord = 0;

  xCoord = 0;

  figureMoveData: FigureMoveData = {
    name: '',
    figureCoords: { x: 0, y: 0 },
    possibleMoves: [],
  };

  readonly name;

  readonly image;

  constructor({
    side,
    blackFigure,
    whiteFigure,
    name,
    coords,
    board,
    namePrefix,
  }: FigureData) {
    this.side = side;
    this.board = board;
    this.xCoord = coords.x;
    this.yCoord = coords.y;
    this.name = namePrefix ? `${namePrefix} ${name}` : name;
    this.image = side === 'black' ? blackFigure : whiteFigure;

    this.figureMoveData.figureCoords = coords;
    this.figureMoveData.name = this.name;
  }

  public setXCoord(x: number) {
    this.xCoord = x;
  }

  public setYCoord(y: number) {
    this.yCoord = y;
  }

  public setCoords({ x, y }: Coords, isMovesRecordOnly?: boolean) {
    if (!isMovesRecordOnly) {
      this.figureMoveData.figureCoords = { x, y };
    }
    this.xCoord = x;
    this.yCoord = y;
  }

  public addPossibleCoords(nextCell: CellModel) {
    const nextY = nextCell.coords.y;
    const nextX = nextCell.coords.x;

    this.figureMoveData.possibleMoves.push(`${nextY}${nextX}`);
  }

  public checkNextCell(nextCell: CellModel) {
    const isEmptyCell = !nextCell.figure;

    if (isEmptyCell || nextCell.figure?.side !== this.side) {
      this.addPossibleCoords(nextCell);
    }

    return isEmptyCell;
  }

  public checkAvailableMoves() {
    const { possibleMoves, figureCoords } = this.figureMoveData;
    const figure = this.board.selectedFigure;

    possibleMoves.forEach((move) => {
      const y = +move.split('')[0];
      const x = +move.split('')[1];

      const currentCell = this.board.cells[y][x];

      const isDanger = this.board.checkForPossibleShah({
        moveCoords: { x, y },
        figureCoords,
        figure,
      });

      if (isDanger) {
        currentCell.isDanger = true;
      } else {
        currentCell.isAvailable = true;
      }
    });
  }

  public recordNextPossibleMoves(setCells: () => void) {
    this.figureMoveData.possibleMoves = [];
    setCells();

    const alliedTeam = this.board.teamFigures[this.side];

    alliedTeam.push(this.figureMoveData);
  }

  public showAvailableCells(setCells: () => void) {
    this.figureMoveData.possibleMoves = [];
    setCells();
    this.checkAvailableMoves();
    this.board.refreshCells();
  }
}
