import { Dispatch, SetStateAction } from 'react';

import {
  BOARD_LETTERS,
  BOARD_NUMBERS,
  FIELD_SIZE,
} from '../components/Board/constants';
import { MovesHistory } from '../components/Board/types';
import { variant } from '../components/Cell/Cell.css';
import { CellModel } from './CellModel';
import { LEFT, PawnsOrder, RIGHT } from './constants';
import { Bishop } from './figures/Bishop';
import { King } from './figures/King';
import { Knight } from './figures/Knight';
import { Pawn } from './figures/Pawn';
import { Queen } from './figures/Queen';
import { Rook } from './figures/Rook';
import {
  Kings,
  PossibleMoves,
  RecordData,
} from './figures/types/boardModel';
import { Coords, FigureName } from './figures/types/common';
import { FigureCommon } from './figures/types/figureModel';

export class BoardModel {
  cells: CellModel[][] = [];

  turn: FigureCommon['side'] = 'white';

  selectedFigure: FigureCommon | null = null;

  selectedFigureCoords: Coords | null = null;

  blackDestroyedFigures: FigureCommon[] = [];

  whiteDestroyedFigures: FigureCommon[] = [];

  blackRecordedMoves: RecordData[] = [];

  whiteRecordedMoves: RecordData[] = [];

  blackNextPossibleMoves: PossibleMoves = {};

  whiteNextPossibleMoves: PossibleMoves = {};

  kings: Kings = {} as Kings;

  public setCells;

  private setHistory;

  private blackY = 0;

  private whiteY = 7;

  constructor(
    setCells: Dispatch<SetStateAction<CellModel[][] | undefined>>,
    setHistory: Dispatch<SetStateAction<MovesHistory | undefined>>,
  ) {
    this.setCells = setCells;
    this.setHistory = setHistory;
  }

  private initBoard(iteration?: number, isChild?: boolean): void | CellModel[] {
    const child = true;
    const row: CellModel[] = [];

    for (let i = 0; i < FIELD_SIZE; i++) {
      if (isChild) {
        const isRemnant = !!((iteration as number + i) % 2);
        const variantType = isRemnant ? variant.primary : variant.secondary;

        const x = i;
        const y = iteration as number;

        row.push(new CellModel({
          coords: { x, y },
          colorVariant: variantType,
          isAvailable: false,
          figure: null,
          board: this,
        }));
      } else {
        this.cells.push(this.initBoard(i, child) as CellModel[]);
      }
    }

    if (isChild) return row;
  }

  private initPawns() {
    for (let x = 0; x < FIELD_SIZE; x++) {
      const blackY = 1;
      const whiteY = 6;

      this.cells[blackY][x].figure = new Pawn(
        'black',
        this,
        { x, y: blackY },
        PawnsOrder[x],
      );
      this.cells[whiteY][x].figure = new Pawn(
        'white',
        this,
        { x, y: whiteY },
        PawnsOrder[x],
      );
    }
  }

  private initKings() {
    const x = 3;

    this.cells[this.blackY][x].figure = new King(
      'black',
      this,
      { x, y: this.blackY },
    );
    this.cells[this.whiteY][x].figure = new King(
      'white',
      this,
      { x, y: this.whiteY },
    );
  }

  private initQueens() {
    const x = 4;

    this.cells[this.blackY][x].figure = new Queen(
      'black',
      this,
      { x, y: this.blackY },
    );
    this.cells[this.whiteY][x].figure = new Queen(
      'white',
      this,
      { x, y: this.whiteY },
    );
  }

  private initBishops() {
    const rightX = 5;
    const leftX = 2;

    this.cells[this.blackY][leftX].figure = new Bishop(
      'black',
      this,
      { x: leftX, y: this.blackY },
      LEFT,
    );
    this.cells[this.blackY][rightX].figure = new Bishop(
      'black',
      this,
      { x: rightX, y: this.blackY },
      RIGHT,
    );

    this.cells[this.whiteY][leftX].figure = new Bishop(
      'white',
      this,
      { x: leftX, y: this.whiteY },
      LEFT,
    );
    this.cells[this.whiteY][rightX].figure = new Bishop(
      'white',
      this,
      { x: rightX, y: this.whiteY },
      RIGHT,
    );
  }

  private initKnights() {
    const rightX = 6;
    const leftX = 1;

    this.cells[this.blackY][leftX].figure = new Knight(
      'black',
      this,
      { x: leftX, y: this.blackY },
      LEFT,
    );
    this.cells[this.blackY][rightX].figure = new Knight(
      'black',
      this,
      { x: rightX, y: this.blackY },
      RIGHT,
    );

    this.cells[this.whiteY][leftX].figure = new Knight(
      'white',
      this,
      { x: leftX, y: this.whiteY },
      LEFT,
    );
    this.cells[this.whiteY][rightX].figure = new Knight(
      'white',
      this,
      { x: rightX, y: this.whiteY },
      RIGHT,
    );
  }

  private initRooks() {
    const rightX = 7;
    const leftX = 0;

    this.cells[this.blackY][leftX].figure = new Rook(
      'black',
      this,
      { x: leftX, y: this.blackY },
      LEFT,
    );
    this.cells[this.blackY][rightX].figure = new Rook(
      'black',
      this,
      { x: rightX, y: this.blackY },
      RIGHT,
    );

    this.cells[this.whiteY][leftX].figure = new Rook(
      'white',
      this,
      { x: leftX, y: this.whiteY },
      LEFT,
    );
    this.cells[this.whiteY][rightX].figure = new Rook(
      'white',
      this,
      { x: rightX, y: this.whiteY },
      RIGHT,
    );
  }

  private clearPrevCell() {
    const { x, y } = this.selectedFigureCoords as Coords;
    this.cells[y][x].figure = null;
  }

  private initFigures() {
    this.initPawns();
    this.initKings();
    this.initQueens();
    this.initBishops();
    this.initKnights();
    this.initRooks();
  }

  private captureCurrentCell({ x, y }: Coords) {
    const enemy = this.cells[y][x].figure;

    if (!!enemy) {
      if (this.turn === 'white') {
        this.whiteDestroyedFigures.push(enemy);
      } else {
        this.blackDestroyedFigures.push(enemy);
      }
      this.recordMove({ x, y }, enemy.image);
    } else {
      this.recordMove({ x, y });
    }

    // TODO: Add logic for сastling
    this.selectedFigure?.setCoords({ x, y });
    this.cells[y][x].figure = this.selectedFigure;
  }

  private clearFigureData() {
    this.selectedFigure = null;
    this.selectedFigureCoords = null;
  }

  private changeTurn() {
    this.turn = this.turn === 'white'
      ? 'black'
      : 'white';
  }

  private refreshData() {
    this.refreshCells();
    this.setHistory({
      black: this.blackRecordedMoves,
      white: this.whiteRecordedMoves,
    });
  }

  private recordMove({ x: currentX, y: currentY }: Coords, image?: string) {
    const { x: prevX, y: prevY } = this.selectedFigureCoords as Coords;
    const prevCell = `${BOARD_NUMBERS[prevY]}${BOARD_LETTERS[prevX]}`;
    const currentCell = `${BOARD_NUMBERS[currentY]}${BOARD_LETTERS[currentX]}`;

    if (this.turn === 'white') {
      this.whiteRecordedMoves.push({
        prevCell,
        currentCell,
        date: Date.now(),
        image,
      });
    }
    if (this.turn === 'black') {
      this.blackRecordedMoves.push({
        prevCell,
        currentCell,
        date: Date.now(),
        image,
      });
    }
  }

  private recordNextPossibleMove() {
    // Clean possible moves from
    // previous calculation
    this.blackNextPossibleMoves = {};
    this.whiteNextPossibleMoves = {};

    const cellsWithFigures = this.cells
      .flat()
      .filter((cell) => cell.figure);

    cellsWithFigures.forEach(({ figure }) => {
      figure?.recordNextPossibleCoords();
    });
  }

  private checkForCheckmate() {
    const isCheck = this.checkForCheck(this.turn);
    if (isCheck) {
      alert('CHECK!');
      this.checkForMate();
    }
  }

  private checkForMate() {
    const kingFigure = this.kings[this.turn];
    const alliedMoves = this.turn === 'white'
      ? this.whiteNextPossibleMoves
      : this.blackNextPossibleMoves;

    const currentX = this.kings[this.turn].xCoord;
    const currentY = this.kings[this.turn].yCoord;

    const kingsPossibleMoves = alliedMoves[FigureName.king];

    const imitateMoves = ({ x, y }: Coords) => {
      // remove king from his own position
      this.cells[currentY][currentX].figure = null;

      // move king to position
      this.cells[y][x].figure = kingFigure;
      kingFigure?.setCoords({ x, y });
    };

    const moveBack = ({ x, y }: Coords) => {
      // remove king from his prev position
      this.cells[y][x].figure = null;

      // move to own position
      kingFigure?.setCoords({ x: currentX, y: currentY });
      this.cells[currentY][currentX].figure = kingFigure;
    };

    // Imitation of king`s moves
    const isMate = kingsPossibleMoves.every((possibleMove) => {
      const y = +possibleMove.split('')[0];
      const x = +possibleMove.split('')[1];

      imitateMoves({ x, y });

      this.recordNextPossibleMove();

      const isCheck = this.checkForCheck(this.turn);

      moveBack({ x, y });

      return isCheck;
    });

    this.recordNextPossibleMove();

    if (isMate) {
      // TODO: Refactoring this case
      alert('CHECKMATE!');
      this.reloadGame();
    }
  }

  private reloadGame() {
    this.cells = [];
    this.turn = 'white';
    this.selectedFigure = null;
    this.selectedFigureCoords = null;
    this.blackDestroyedFigures = [];
    this.whiteDestroyedFigures = [];
    this.blackRecordedMoves = [];
    this.whiteRecordedMoves = [];
    this.blackNextPossibleMoves = {};
    this.whiteNextPossibleMoves = {};
    this.kings = {} as Kings;
    this.setHistory({
      white: [],
      black: [],
    });
    this.initGame();
  }

  public checkForCheck(side: FigureCommon['side']) {
    const stringCoords = `${this.kings[side].yCoord}${this.kings[side].xCoord}`;

    const enemiesCoords = side === 'white'
      ? this.blackNextPossibleMoves
      : this.whiteNextPossibleMoves;

    return Object.values(enemiesCoords)
      .flat()
      .some((coord) => coord === stringCoords);
  }

  public refreshCells() {
    this.setCells([...this.cells]);
  }

  public initGame() {
    this.initBoard();
    this.initFigures();
    this.setCells(this.cells);
  }

  public moveFigure(coords: Coords) {
    (this.selectedFigure as FigureCommon).moves++;
    this.clearPrevCell();
    this.captureCurrentCell(coords);
    this.recordNextPossibleMove();

    this.changeTurn();
    this.checkForCheckmate();
    this.clearFigureData();
    this.clearMarks();
    this.refreshData();
  }

  public clearMarks() {
    this.cells.forEach((row) => {
      row.forEach((cell) => {
        cell.isAvailable = false;
      });
    });

    this.refreshCells();
  }

  public setFigureData(figure: FigureCommon, coords: Coords) {
    if (this.selectedFigure) {
      this.clearMarks();
    }

    this.selectedFigure = figure;
    this.selectedFigureCoords = coords;
  }
}
