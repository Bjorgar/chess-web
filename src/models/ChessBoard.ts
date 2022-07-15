import { FIELD_SIZE } from '../components/Board/constants';
import { variant } from '../components/Cell/Cell.css';
import { CellModel } from './CellModel';
import { ChessManager } from './ChessManager';
import { LEFT, PawnsOrder, RIGHT } from './constants';
import { Bishop } from './figures/Bishop';
import { King } from './figures/King';
import { Knight } from './figures/Knight';
import { Pawn } from './figures/Pawn';
import { Queen } from './figures/Queen';
import { Rook } from './figures/Rook';
import { ICellModel } from './figures/types/cellModel';
import { IChessBoard } from './figures/types/chessBoardModel';

export class ChessBoard implements IChessBoard {
  cells: ICellModel[][] = [];

  manager: ChessManager;

  private blackY = 0;

  private whiteY = 7;

  constructor(manager: ChessManager) {
    this.manager = manager;
  }

  public initBoard(iteration?: number, isChild?: boolean): void | ICellModel[] {
    const child = true;
    const row: ICellModel[] = [];

    for (let i = 0; i < FIELD_SIZE; i++) {
      if (isChild) {
        const isRemnant = !!((iteration as number + i) % 2);
        const variantType = isRemnant ? variant.primary : variant.secondary;

        const x = i;
        const y = iteration as number;

        row.push(new CellModel({
          figure: null,
          isDanger: false,
          isCastling: false,
          isAvailable: false,
          coords: { x, y },
          manager: this.manager,
          colorVariant: variantType,
        }));
      } else {
        this.cells.push(this.initBoard(i, child) as ICellModel[]);
      }
    }

    if (isChild) return row;
  }

  private initPawns() {
    for (let x = 0; x < FIELD_SIZE; x++) {
      const blackY = 1;
      const whiteY = 6;

      this.cells[blackY][x].figure = new Pawn({
        board: this,
        side: 'black',
        manager: this.manager,
        coords: { x, y: blackY },
        namePrefix: PawnsOrder[x],
      });
      this.cells[whiteY][x].figure = new Pawn({
        board: this,
        side: 'white',
        manager: this.manager,
        coords: { x, y: whiteY },
        namePrefix: PawnsOrder[x],
      });
    }
  }

  private initKings() {
    const x = 4;

    this.cells[this.blackY][x].figure = new King({
      board: this,
      side: 'black',
      manager: this.manager,
      coords: { x, y: this.blackY },
    });
    this.cells[this.whiteY][x].figure = new King({
      board: this,
      side: 'white',
      manager: this.manager,
      coords: { x, y: this.whiteY },
    });
  }

  private initQueens() {
    const x = 3;

    this.cells[this.blackY][x].figure = new Queen({
      board: this,
      side: 'black',
      manager: this.manager,
      coords: { x, y: this.blackY },
    });
    this.cells[this.whiteY][x].figure = new Queen({
      board: this,
      side: 'white',
      manager: this.manager,
      coords: { x, y: this.whiteY },
    });
  }

  private initBishops() {
    const rightX = 5;
    const leftX = 2;

    this.cells[this.blackY][leftX].figure = new Bishop({
      board: this,
      side: 'black',
      manager: this.manager,
      coords: { x: leftX, y: this.blackY },
      namePrefix: LEFT,
    });
    this.cells[this.blackY][rightX].figure = new Bishop({
      board: this,
      side: 'black',
      manager: this.manager,
      coords: { x: rightX, y: this.blackY },
      namePrefix: RIGHT,
    });

    this.cells[this.whiteY][leftX].figure = new Bishop({
      board: this,
      side: 'white',
      manager: this.manager,
      coords: { x: leftX, y: this.whiteY },
      namePrefix: LEFT,
    });
    this.cells[this.whiteY][rightX].figure = new Bishop({
      board: this,
      side: 'white',
      manager: this.manager,
      coords: { x: rightX, y: this.whiteY },
      namePrefix: RIGHT,
    });
  }

  private initKnights() {
    const rightX = 6;
    const leftX = 1;

    this.cells[this.blackY][leftX].figure = new Knight({
      board: this,
      side: 'black',
      manager: this.manager,
      coords: { x: leftX, y: this.blackY },
      namePrefix: LEFT,
    });
    this.cells[this.blackY][rightX].figure = new Knight({
      board: this,
      side: 'black',
      manager: this.manager,
      coords: { x: rightX, y: this.blackY },
      namePrefix: RIGHT,
    });

    this.cells[this.whiteY][leftX].figure = new Knight({
      board: this,
      side: 'white',
      manager: this.manager,
      coords: { x: leftX, y: this.whiteY },
      namePrefix: LEFT,
    });
    this.cells[this.whiteY][rightX].figure = new Knight({
      board: this,
      side: 'white',
      manager: this.manager,
      coords: { x: rightX, y: this.whiteY },
      namePrefix: RIGHT,
    });
  }

  private initRooks() {
    const rightX = 7;
    const leftX = 0;

    this.cells[this.blackY][leftX].figure = new Rook({
      board: this,
      side: 'black',
      manager: this.manager,
      coords: { x: leftX, y: this.blackY },
      namePrefix: LEFT,
    });
    this.cells[this.blackY][rightX].figure = new Rook({
      board: this,
      side: 'black',
      manager: this.manager,
      coords: { x: rightX, y: this.blackY },
      namePrefix: RIGHT,
    });

    this.cells[this.whiteY][leftX].figure = new Rook({
      board: this,
      side: 'white',
      manager: this.manager,
      coords: { x: leftX, y: this.whiteY },
      namePrefix: LEFT,
    });
    this.cells[this.whiteY][rightX].figure = new Rook({
      board: this,
      side: 'white',
      manager: this.manager,
      coords: { x: rightX, y: this.whiteY },
      namePrefix: RIGHT,
    });
  }

  public initFigures() {
    this.initPawns();
    this.initKings();
    this.initQueens();
    this.initBishops();
    this.initKnights();
    this.initRooks();
  }
}
