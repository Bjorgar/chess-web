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
  DataForMove,
  Kings,
  RecordData,
  RecordMoveData,
  TeamsFigures,
  VirtualMoveData,
} from './figures/types/boardModel';
import { Coords, Side } from './figures/types/common';
import { FigureCommon } from './figures/types/figureModel';

export class BoardModel {
  cells: CellModel[][] = [];

  turn: Side = 'white';

  selectedFigure: FigureCommon | null = null;

  savedEnemyFigure: FigureCommon | null = null;

  selectedFigureCoords: Coords | null = null;

  blackDestroyedFigures: FigureCommon[] = [];

  whiteDestroyedFigures: FigureCommon[] = [];

  blackRecordedMoves: RecordData[] = [];

  whiteRecordedMoves: RecordData[] = [];

  teamFigures: TeamsFigures = {
    white: [],
    black: [],
  };

  kings: Kings = {} as Kings;

  isShah = false;

  public setCells;

  private setHistory;

  private setTurn;

  private setNotification;

  private blackY = 0;

  private whiteY = 7;

  constructor(
    setCells: Dispatch<SetStateAction<CellModel[][] | undefined>>,
    setHistory: Dispatch<SetStateAction<MovesHistory | undefined>>,
    setTurn: Dispatch<SetStateAction<Side>>,
    setNotification: Dispatch<SetStateAction<string>>,
  ) {
    this.setCells = setCells;
    this.setHistory = setHistory;
    this.setTurn = setTurn;
    this.setNotification = setNotification;
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
          isDanger: false,
          isCastling: false,
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
    const x = 4;

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
    const x = 3;

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

  private clearPrevCell({ x, y }: Coords) {
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

  private captureAvailableCell({
    moveCoords,
    figureCoords,
    figure,
    isPreview,
  }: DataForMove) {
    const { x, y } = moveCoords;
    const enemy = this.cells[y][x].figure;

    if (isPreview) {
      if (!!enemy) {
        this.savedEnemyFigure = enemy;
      }
    } else {
      this.recordMove({
        moveCoords,
        figureCoords,
        image: enemy?.image,
      });

      if (!!enemy) {
        if (this.turn === 'white') {
          this.whiteDestroyedFigures.push(enemy);
        } else {
          this.blackDestroyedFigures.push(enemy);
        }
      }
    }

    figure?.setCoords(moveCoords, isPreview);

    // Move
    this.cells[y][x].figure = figure;
    this.clearPrevCell(figureCoords);
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
    this.setTurn(this.turn);
  }

  private recordMove({
    moveCoords: { x: currentX, y: currentY },
    figureCoords: { x: prevX, y: prevY },
    image,
  }: RecordMoveData) {
    const prevCell = `${BOARD_LETTERS[prevX]}${BOARD_NUMBERS[prevY]}`;
    const currentCell = `${BOARD_LETTERS[currentX]}${BOARD_NUMBERS[currentY]}`;

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
    this.teamFigures.white = [];
    this.teamFigures.black = [];

    const cellsWithFigures = this.cells
      .flat()
      .filter((cell) => cell.figure);

    cellsWithFigures.forEach(({ figure }) => {
      figure?.recordMoves();
    });
  }

  private checkForCheckmate() {
    const isShah = this.checkForShah(this.turn);
    if (isShah) {
      this.isShah = true;
      const isAllDanger = this.checkAllMovesForDanger();

      if (isAllDanger) {
        // TODO: Add popup for this
        alert('Checkmate!');
        this.reloadGame();
      } else {
        alert('Shah!');
      }
    }
  }

  private returnEnemyFigureBack = ({ x, y }: Coords) => {
    this.cells[y][x].figure = this.savedEnemyFigure;
    // Clear saved enemy figure
    this.savedEnemyFigure = null;
  };

  public checkForPossibleShah({
    moveCoords,
    figureCoords,
    figure,
  }: VirtualMoveData) {
    const isPreview = true;

    this.captureAvailableCell({
      moveCoords,
      figureCoords,
      figure,
      isPreview,
    });

    this.recordNextPossibleMove();

    const isShah = this.checkForShah(this.turn);

    // Move back
    this.captureAvailableCell({
      moveCoords: figureCoords,
      figureCoords: moveCoords,
      figure,
      isPreview,
    });

    // Reset possible moves after virtual figures moves
    this.recordNextPossibleMove();

    if (this.savedEnemyFigure) {
      this.returnEnemyFigureBack(moveCoords);
    }

    return isShah;
  }

  private checkForAvailableMoves() {
    const alliedTeam = this.teamFigures[this.turn];

    const isMoves = alliedTeam
      .map(({ possibleMoves }) => possibleMoves)
      .flat()
      .length;

    const isAvailableMoves = isMoves && !this.checkAllMovesForDanger();

    if (!isAvailableMoves) {
      alert('PAT!');
      this.reloadGame();
    }
  }

  private checkAllMovesForDanger() {
    const alliedTeam = this.teamFigures[this.turn];

    return alliedTeam
      .every(({ figureCoords, possibleMoves }) => {
        const {
          x: figureX,
          y: figureY,
        } = figureCoords;

        const { figure } = this.cells[figureY][figureX];

        return possibleMoves.every((move) => {
          const y = +move.split('')[0];
          const x = +move.split('')[1];

          return this.checkForPossibleShah({
            moveCoords: { x, y },
            figureCoords,
            figure,
          });
        });
      });
  }

  private replaceRook({ x, y }: Coords) {
    let rook: FigureCommon;

    if (x === 6) {
      rook = this.cells[y][7].figure as FigureCommon;
      this.captureAvailableCell({
        moveCoords: { x: 5, y },
        figureCoords: { x: 7, y },
        figure: rook,
      });
    }

    if (x === 2) {
      rook = this.cells[y][0].figure as FigureCommon;
      this.captureAvailableCell({
        moveCoords: { x: 3, y },
        figureCoords: { x: 0, y },
        figure: rook,
      });
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
    this.teamFigures.white = [];
    this.teamFigures.black = [];
    this.kings = {} as Kings;
    this.isShah = false;
    this.setTurn('white');
    this.setHistory({
      white: [],
      black: [],
    });
    this.initGame();
  }

  public checkForShah(side: Side) {
    const kingCoords = `${this.kings[side].yCoord}${this.kings[side].xCoord}`;

    const enemiesTeam = side === 'white'
      ? this.teamFigures.black
      : this.teamFigures.white;

    return enemiesTeam.map(({ possibleMoves }) => possibleMoves)
      .flat()
      .some((coord) => coord === kingCoords);
  }

  public refreshCells() {
    this.setCells([...this.cells]);
  }

  public initGame() {
    this.initBoard();
    this.initFigures();
    this.setCells(this.cells);
  }

  public moveFigure(coords: Coords, isCastling: boolean) {
    (this.selectedFigure as FigureCommon).moves++;
    if (this.isShah) this.isShah = false;
    if (isCastling) {
      this.replaceRook(coords);
    }

    this.captureAvailableCell({
      moveCoords: coords,
      figureCoords: this.selectedFigureCoords as Coords,
      figure: this.selectedFigure,
    });
    this.recordNextPossibleMove();

    this.changeTurn();
    this.checkForCheckmate();
    this.checkForAvailableMoves();
    this.clearFigureData();
    this.clearMarks();
    this.refreshData();
  }

  public clearMarks() {
    this.cells.forEach((row) => {
      row.forEach((cell) => {
        cell.isAvailable = false;
        cell.isDanger = false;
        cell.isCastling = false;
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
