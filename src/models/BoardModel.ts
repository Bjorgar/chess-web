import { Dispatch, SetStateAction } from 'react';

import {
  BOARD_LETTERS,
  BOARD_NUMBERS,
  FIELD_SIZE,
} from '../components/Board/constants';
import { variant } from '../components/Cell/Cell.css';
import { CellModel } from './CellModel';
import { Bishop } from './figures/Bishop';
import { King } from './figures/King';
import { Knight } from './figures/Knight';
import { Pawn } from './figures/Pawn';
import { Queen } from './figures/Queen';
import { Rook } from './figures/Rook';
import { RecordData } from './figures/types/boardModel';
import { Coords } from './figures/types/common';
import { FigureCommon } from './figures/types/figureModel';

export class BoardModel {
  cells: CellModel[][] = [];

  turn: FigureCommon['side'] = 'white';

  selectedFigure: FigureCommon | null = null;

  selectedFigureCoords: Coords | null = null;

  blackDestroyedFigures: FigureCommon[] = [];

  whiteDestroyedFigures: FigureCommon[] = [];

  blackRecordedMover: RecordData[] = [];

  whiteRecordedMover: RecordData[] = [];

  public setCells;

  private blackY = 0;

  private whiteY = 7;

  constructor(setCells: Dispatch<SetStateAction<CellModel[][] | undefined>>) {
    this.setCells = setCells;
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

      this.cells[blackY][x].figure = new Pawn('black', this, { x, y: blackY });
      this.cells[whiteY][x].figure = new Pawn('white', this, { x, y: whiteY });
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
    );
    this.cells[this.blackY][rightX].figure = new Bishop(
      'black',
      this,
      { x: rightX, y: this.blackY },
    );

    this.cells[this.whiteY][leftX].figure = new Bishop(
      'white',
      this,
      { x: leftX, y: this.whiteY },
    );
    this.cells[this.whiteY][rightX].figure = new Bishop(
      'white',
      this,
      { x: rightX, y: this.whiteY },
    );
  }

  private initKnights() {
    const rightX = 6;
    const leftX = 1;

    this.cells[this.blackY][leftX].figure = new Knight(
      'black',
      this,
      { x: leftX, y: this.blackY },
    );
    this.cells[this.blackY][rightX].figure = new Knight(
      'black',
      this,
      { x: rightX, y: this.blackY },
    );

    this.cells[this.whiteY][leftX].figure = new Knight(
      'white',
      this,
      { x: leftX, y: this.whiteY },
    );
    this.cells[this.whiteY][rightX].figure = new Knight(
      'white',
      this,
      { x: rightX, y: this.whiteY },
    );
  }

  private initRooks() {
    const rightX = 7;
    const leftX = 0;

    this.cells[this.blackY][leftX].figure = new Rook(
      'black',
      this,
      { x: leftX, y: this.blackY },
    );
    this.cells[this.blackY][rightX].figure = new Rook(
      'black',
      this,
      { x: rightX, y: this.blackY },
    );

    this.cells[this.whiteY][leftX].figure = new Rook(
      'white',
      this,
      { x: leftX, y: this.whiteY },
    );
    this.cells[this.whiteY][rightX].figure = new Rook(
      'white',
      this,
      { x: rightX, y: this.whiteY },
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
    }

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

  private recordMove({ x: currentX, y: currentY }: Coords) {
    const { x: prevX, y: prevY } = this.selectedFigureCoords as Coords;
    const prevCell = `${BOARD_LETTERS[prevY]}${BOARD_NUMBERS[prevX]}`;
    const currentCell = `${BOARD_LETTERS[currentY]}${BOARD_NUMBERS[currentX]}`;

    if (this.turn === 'white') {
      this.whiteRecordedMover.push({
        prevCell,
        currentCell,
        date: Date.now,
      });
    }
  }

  private recordNextFiguresMove() {
    const preview = true;
    const cellsWithFigures = this.cells
      .flat()
      .filter((cell) => cell.figure);

    cellsWithFigures.forEach(({ figure }) => {
      figure?.getAvailableCells(preview);
    });
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
    this.recordMove(coords);
    this.recordNextFiguresMove();
    this.changeTurn();
    this.clearFigureData();
    this.clearMarks();
    this.refreshCells();
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
