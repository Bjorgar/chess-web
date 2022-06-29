import { Dispatch, SetStateAction } from 'react';

import { FIELD_SIZE } from '../components/Board/constants';
import { variant } from '../components/Cell/Cell.css';
import { CellModel } from './CellModel';
import { Bishop } from './figures/Bishop';
import { King } from './figures/King';
import { Knight } from './figures/Knight';
import { Pawn } from './figures/Pawn';
import { Queen } from './figures/Queen';
import { Rook } from './figures/Rook';
import { Coords } from './figures/types/common';

export class BoardModel {
  cells: CellModel[][] = [];

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

        row.push(new CellModel({
          x: i,
          y: iteration as number,
          colorVariant: variantType,
          isAvailable: false,
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

      this.cells[blackY][x].figure = new Pawn('black', this);
      this.cells[whiteY][x].figure = new Pawn('white', this);
    }
  }

  private initKing() {
    const x = 3;

    this.cells[this.blackY][x].figure = new King('black', this);
    this.cells[this.whiteY][x].figure = new King('white', this);
  }

  private initQueen() {
    const x = 4;

    this.cells[this.blackY][x].figure = new Queen('black', this);
    this.cells[this.whiteY][x].figure = new Queen('white', this);
  }

  private initBishop() {
    const rightX = 5;
    const leftX = 2;

    this.cells[this.blackY][leftX].figure = new Bishop('black', this);
    this.cells[this.blackY][rightX].figure = new Bishop('black', this);

    this.cells[this.whiteY][leftX].figure = new Bishop('white', this);
    this.cells[this.whiteY][rightX].figure = new Bishop('white', this);
  }

  private initKnight() {
    const rightX = 6;
    const leftX = 1;

    this.cells[this.blackY][leftX].figure = new Knight('black', this);
    this.cells[this.blackY][rightX].figure = new Knight('black', this);

    this.cells[this.whiteY][leftX].figure = new Knight('white', this);
    this.cells[this.whiteY][rightX].figure = new Knight('white', this);
  }

  private initRooks() {
    const rightX = 7;
    const leftX = 0;

    this.cells[this.blackY][leftX].figure = new Rook('black', this);
    this.cells[this.blackY][rightX].figure = new Rook('black', this);

    this.cells[this.whiteY][leftX].figure = new Rook('white', this);
    this.cells[this.whiteY][rightX].figure = new Rook('white', this);
  }

  private initFigures() {
    this.initPawns();
    this.initKing();
    this.initQueen();
    this.initBishop();
    this.initKnight();
    this.initRooks();
  }

  public reloadCells() {
    this.setCells([...this.cells]);
  }

  public initGame() {
    this.initBoard();
    this.initFigures();
    this.setCells(this.cells);
  }

  public setAvailableCoords(coords: Coords[]) {
    coords.forEach(({ x, y }) => {
      this.cells[y][x].isAvailable = true;
    });

    this.reloadCells();
  }
}
