import { Dispatch, SetStateAction } from 'react';

import {
  BOARD_LETTERS,
  BOARD_NUMBERS,
} from '../components/Board/constants';
import { MovesHistory } from '../components/Board/types';
import { ChessBoard } from './ChessBoard';
import { ICellModel } from './figures/types/cellModel';
import {
  DataForMove,
  IChessManager,
  Kings,
  RecordedMoves,
  RecordMoveData,
  TeamsFigures,
  VirtualMoveData,
} from './figures/types/chessManagerModel';
import { Coords, Side } from './figures/types/common';
import { ChessFigure } from './figures/types/figureModel';

export class ChessManager implements IChessManager {
  turn: Side = 'white';

  teamFigures: TeamsFigures = {
    white: [],
    black: [],
  };

  kings: Kings = {
    white: {},
    black: {},
  } as Kings;

  isShah = false;

  board;

  private recordedMoves: RecordedMoves = {
    white: [],
    black: [],
  };

  private selectedFigure: ChessFigure | null = null;

  private selectedFigureCoords: Coords | null = null;

  private savedEnemyFigure: ChessFigure | null = null;

  private blackDestroyedFigures: ChessFigure[] = [];

  private whiteDestroyedFigures: ChessFigure[] = [];

  private isEndGame = false;

  private setCells;

  private setHistory;

  private setTurn;

  private setNotification;

  constructor(
    setCells: Dispatch<SetStateAction<ICellModel[][] | undefined>>,
    setHistory: Dispatch<SetStateAction<MovesHistory | undefined>>,
    setTurn: Dispatch<SetStateAction<Side>>,
    setNotification: Dispatch<SetStateAction<string>>,
  ) {
    this.setCells = setCells;
    this.setHistory = setHistory;
    this.setTurn = setTurn;
    this.setNotification = setNotification;
    this.board = new ChessBoard(this);
  }

  private clearPrevCell({ x, y }: Coords): void {
    this.board.cells[y][x].figure = null;
  }

  private captureAvailableCell({
    moveCoords,
    figureCoords,
    figure,
    isPreview,
  }: DataForMove): void {
    const { x, y } = moveCoords;
    const enemy = this.board.cells[y][x].figure;

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

    // Move figure
    this.board.cells[y][x].figure = figure;
    this.clearPrevCell(figureCoords);
  }

  private clearFigureData(): void {
    this.selectedFigure = null;
    this.selectedFigureCoords = null;
  }

  private changeTurn(): void {
    this.turn = this.turn === 'white'
      ? 'black'
      : 'white';
  }

  private refreshData(): void {
    const { white, black } = this.recordedMoves;

    this.refreshCells();
    this.setHistory({
      white,
      black,
    });
    this.setTurn(this.turn);
  }

  private recordMove({
    moveCoords: { x: currentX, y: currentY },
    figureCoords: { x: prevX, y: prevY },
    image,
  }: RecordMoveData): void {
    const prevCell = `${BOARD_LETTERS[prevX]}${BOARD_NUMBERS[prevY]}`;
    const currentCell = `${BOARD_LETTERS[currentX]}${BOARD_NUMBERS[currentY]}`;

    this.recordedMoves[this.turn].push({
      prevCell,
      currentCell,
      date: Date.now(),
      image,
    });
  }

  private recordNextPossibleMove(): void {
    // Clean possible moves from
    // previous calculation
    this.teamFigures.white = [];
    this.teamFigures.black = [];

    const cellsWithFigures = this.board.cells
      .flat()
      .filter((cell) => cell.figure);

    cellsWithFigures.forEach(({ figure }) => {
      figure?.recordAvailableMoves();
    });
  }

  private checkForEndGame(): void {
    const isShah = this.checkForShah(this.turn);

    if (isShah) {
      this.isShah = true;
      const isMate = this.checkAllMovesForDanger();

      if (isMate) {
        // TODO: Add popup for this
        alert('Checkmate!');
        this.isEndGame = true;
      } else {
        alert('Shah!');
      }
    } else {
      this.checkForPat();
    }
  }

  private returnEnemyFigureBack({ x, y }: Coords): void {
    this.board.cells[y][x].figure = this.savedEnemyFigure;
    // Clear saved enemy figure
    this.savedEnemyFigure = null;
  }

  private checkForPat(): void {
    const alliedTeam = this.teamFigures[this.turn];

    const isMoves = alliedTeam
      .map(({ possibleMoves }) => possibleMoves)
      .flat()
      .length;

    const isAvailableMoves = isMoves && !this.checkAllMovesForDanger();

    if (!isAvailableMoves) {
      alert('PAT!');
      this.isEndGame = true;
    }
  }

  private checkAllMovesForDanger(): boolean {
    const alliedTeam = this.teamFigures[this.turn];

    return alliedTeam
      .every(({ figureCoords, possibleMoves, figure }) => possibleMoves
        .every((move) => {
          const y = +move.split('')[0];
          const x = +move.split('')[1];

          return this.checkForPossibleShah({
            moveCoords: { x, y },
            figureCoords,
            figure,
          });
        }));
  }

  private replaceRook({ x, y }: Coords): void {
    let rook: ChessFigure;

    if (x === 6) {
      rook = this.board.cells[y][7].figure as ChessFigure;
      this.captureAvailableCell({
        moveCoords: { x: 5, y },
        figureCoords: { x: 7, y },
        figure: rook,
      });
    }

    if (x === 2) {
      rook = this.board.cells[y][0].figure as ChessFigure;
      this.captureAvailableCell({
        moveCoords: { x: 3, y },
        figureCoords: { x: 0, y },
        figure: rook,
      });
    }
  }

  private reloadGame(): void {
    this.isEndGame = false;
    this.board.cells = [];
    this.turn = 'white';
    this.selectedFigure = null;
    this.selectedFigureCoords = null;
    this.blackDestroyedFigures = [];
    this.whiteDestroyedFigures = [];
    this.recordedMoves = {
      white: [],
      black: [],
    };
    this.kings = {
      white: {},
      black: {},
    } as Kings;
    this.teamFigures.white = [];
    this.teamFigures.black = [];
    this.isShah = false;
    this.setTurn('white');
    this.setHistory({
      white: [],
      black: [],
    });
    this.initGame();
  }

  private checkForShah(side: Side): boolean {
    const king = this.kings[side];
    const kingCoords = `${king.yCoord}${king.xCoord}`;

    const enemiesTeam = side === 'white'
      ? this.teamFigures.black
      : this.teamFigures.white;

    return enemiesTeam.map(({ possibleMoves }) => possibleMoves)
      .flat()
      .some((coord) => coord === kingCoords);
  }

  public checkForPossibleShah({
    moveCoords,
    figureCoords,
    figure,
  }: VirtualMoveData): boolean {
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

  public refreshCells(): void {
    this.setCells([...this.board.cells]);
  }

  public initGame(): void {
    this.board.initBoard();
    this.board.initFigures();
    this.setCells(this.board.cells);
  }

  public moveFigure(coords: Coords, isCastling: boolean): void {
    (this.selectedFigure as ChessFigure).moves++;

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
    this.checkForEndGame();

    if (this.isEndGame) {
      this.reloadGame();
      return;
    }

    this.clearFigureData();
    this.clearMarks();
    this.refreshData();
  }

  public clearMarks(): void {
    this.board.cells.forEach((row) => {
      row.forEach((cell) => {
        cell.isAvailable = false;
        cell.isDanger = false;
        cell.isCastling = false;
      });
    });

    this.refreshCells();
  }

  public setFigureData(figure: ChessFigure, coords: Coords): void {
    if (this.selectedFigure) {
      this.clearMarks();
    }

    this.selectedFigure = figure;
    this.selectedFigureCoords = coords;
  }
}
