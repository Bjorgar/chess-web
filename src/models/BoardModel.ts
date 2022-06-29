import { Dispatch, SetStateAction } from 'react';

import { FIELD_SIZE } from '../components/Board/constants';
import { variant } from '../components/Cell/Cell.css';
import { Bishop } from './Bishop';
import { CellModel } from './CellModel';
import { King } from './King';
import { Knight } from './Knight';
import { Pawn } from './Pawn';
import { Queen } from './Queen';
import { Rook } from './Rook';

export class BoardModel {
  cells: CellModel[][] = [];

  public setCells;

  private blackY = 0;

  private whiteY = 7;

  constructor(setCells: Dispatch<SetStateAction<CellModel[][] | undefined>>) {
    this.setCells = setCells;
  }

  public initBoard(iteration?: number, isChild?: boolean): void | CellModel[] {
    const child = true;
    const row: CellModel[] = [];
    for (let i = 0; i < FIELD_SIZE; i++) {
      if (isChild) {
        const isRemnant = !!((iteration as number + i) % 2);
        const variantType = isRemnant ? variant.primary : variant.secondary;

        row.push(new CellModel({
          x: i,
          y: iteration as number,
          colorVariant: variantType,
          figure: null,
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

      this.cells[blackY][x].figure = new Pawn('black');
      this.cells[whiteY][x].figure = new Pawn('white');
    }
  }

  private initKing() {
    const x = 3;

    this.cells[this.blackY][x].figure = new King('black');
    this.cells[this.whiteY][x].figure = new King('white');
  }

  private initQueen() {
    const x = 4;

    this.cells[this.blackY][x].figure = new Queen('black');
    this.cells[this.whiteY][x].figure = new Queen('white');
  }

  private initBishop() {
    const rightX = 5;
    const leftX = 2;

    this.cells[this.blackY][leftX].figure = new Bishop('black');
    this.cells[this.blackY][rightX].figure = new Bishop('black');

    this.cells[this.whiteY][leftX].figure = new Bishop('white');
    this.cells[this.whiteY][rightX].figure = new Bishop('white');
  }

  private initKnight() {
    const rightX = 6;
    const leftX = 1;

    this.cells[this.blackY][leftX].figure = new Knight('black');
    this.cells[this.blackY][rightX].figure = new Knight('black');

    this.cells[this.whiteY][leftX].figure = new Knight('white');
    this.cells[this.whiteY][rightX].figure = new Knight('white');
  }

  private initRooks() {
    const rightX = 7;
    const leftX = 0;

    this.cells[this.blackY][leftX].figure = new Rook('black');
    this.cells[this.blackY][rightX].figure = new Rook('black');

    this.cells[this.whiteY][leftX].figure = new Rook('white');
    this.cells[this.whiteY][rightX].figure = new Rook('white');
  }

  public initFigures() {
    this.initPawns();
    this.initKing();
    this.initQueen();
    this.initBishop();
    this.initKnight();
    this.initRooks();
  }
}
