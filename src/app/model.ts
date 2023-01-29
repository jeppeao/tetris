export const COLS: number = 10;
export const ROWS: number = 15;

export interface iColor {
  r: number,
  g: number,
  b: number
}

const SCORES: {[key: string]: number} = {
  drop: 2, 
  movedown: 1,
  single: 100,
  double: 300,
  triple: 500,
  tetris: 800 
}

export const COLORS = [
  {r: 20, g: 225, b: 225}, //'cyan',
  {r: 3, g: 65, b: 174}, //'blue',
  {r: 235, g: 151, b: 28}, //'orange',
  {r: 235, g: 230, b: 30}, //'yellow',
  {r: 114, g: 203, b: 59}, //'green',
  {r: 180, g: 30, b: 180}, //'purple',
  {r: 225, g: 50, b: 19}, //'red'
];

export const SHAPES = [
  [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  [[2, 0, 0], [2, 2, 2]],
  [[0, 0, 3], [3, 3, 3]],
  [[4, 4], [4, 4]],
  [[0, 5, 5], [5, 5, 0]],
  [[0, 6, 0], [6, 6, 6]],
  [[7, 7, 0], [0, 7, 7]]
];

export interface iPiece {
  x: number;
  y: number;
  shape: number[][];
  color: iColor;
}

export enum Move {
  left = "left",
  right = "right",
  down = "down",
  rotateClockwise = "rotateClockwise",
  rotateCounterclockwise ="rotateCounterclockwise",
  drop = "drop"
}

export class tetrisGame {
  board: number[][] = [[]];
  piece: iPiece = {} as iPiece;
  nextPiece: iPiece = {} as iPiece;
  shadowPiece: iPiece ={} as iPiece;
  score: number = 0;
  level = 1;
  linesCleared = 0;
  LINES_PER_LEVEL = 10;
  TIMING_FACTOR = 0.8;
  gameOver = false;

  moves = {
    left: (p: iPiece) => this.translate(p, {x: -1, y: 0}),
    right: (p: iPiece) => this.translate(p, {x: 1, y: 0}),
    down: (p: iPiece) => this.translate(p, {x: 0, y: 1}),
    rotateClockwise: (p: iPiece) => this.rotateClockwise(p),
    rotateCounterclockwise: (p: iPiece) => this.rotateCounterclockwise(p),
    drop: (p: iPiece) => this.drop(p)
  }

  constructor() {
    this.newGame();
  }

  randomPiece() {
    const type = Math.floor(Math.random() * SHAPES.length);
    const color = COLORS[type];
    const shape = SHAPES[type];
    const x = type === 3 ? 4 : 3; 
    const y = 0;
    return {x, y, shape, color};
  }

  resetBoard() {
    this.board = Array(ROWS).fill(0).map(row => Array(COLS).fill(0));
  }

  newGame() {
    this.resetBoard();
    this.piece = this.randomPiece();
    this.nextPiece = this.randomPiece();
    this.updateShadowPiece();
    this.score = 0;
    this.level = 1;
    this.linesCleared = 0;
  }

  validPos(p: iPiece, board: number[][]): boolean {
    return p.shape.every((row, dy) => {
      return row.every((val, dx) => {
        const x: number = p.x + dx;
        const y: number = p.y + dy;
        return (
          this.isEmpty(val) ||
          this.posWithinBoard(x, y) && this.posFree(x, y, board)
        );
      });
    });
  }

  hasPieceLanded() {
    const below = this.moves.down(this.piece);
    return !this.validPos(below, this.board);
  }

  isEmpty(val: number): boolean {
    return val === 0;
  }

  posWithinBoard(x: number, y: number): boolean {
    return x >= 0 && x < COLS && y >= 0 && y < ROWS;
  }

  posFree(x: number, y: number, board: number[][]): boolean {
    return board[y][x] === 0;
  }

  translate(piece: iPiece, move: {x: number, y: number}): iPiece {
    return {...piece, x: piece.x + move.x, y: piece.y + move.y};
  }

  rotateClockwise(p: iPiece): iPiece {
    const shape = p.shape[0].map(
      (_, ci) => p.shape.map(row => row[ci]).reverse()
    );
    return {...p, shape: shape};
  }

  rotateCounterclockwise(p: iPiece): iPiece{
    const shape = p.shape[0].map(
      (_, ci) => p.shape.map(row => row[row.length-1 - ci])
    );
    return {...p, shape: shape};
  }

  drop(p:iPiece): iPiece{
    let next = this.moves.down(p);
    const scorable = p === this.piece;
    while (this.validPos(next, this.board)) {
      p = next;
      next = this.moves.down(next);
      if (scorable) { 
        this.score += 2 * this.level
      }
    }
    return p;
  }

  move(move: Move): boolean {
    let p = this.moves[move](this.piece);
    if (!this.validPos(p, this.board)) return false;
    this.piece = p;
    if (move === Move.down) {
      this.score += 1 * this.level;
    }
    if (move != "drop" && move != "down") {
      this.updateShadowPiece();
    }
    return true;
  }

  freezePiece() {
    this.piece.shape.forEach((row, dy) => {
      row.forEach((val, dx) => {
        const x: number = this.piece.x + dx;
        const y: number = this.piece.y + dy;
        if (this.posWithinBoard(x, y) && val > 0) {
          this.board[y][x] = val;
        }
      });
    });
    this.spawnNewPiece();
  }

  spawnNewPiece() {
    if (!this.validPos(this.nextPiece, this.board)) {
      this.loseGame();
    }
    else {
      this.piece = this.nextPiece;
      this.nextPiece = this.randomPiece();
    }
    this.updateShadowPiece();
  }

  clearLines() {
    const nb = JSON.parse(JSON.stringify(this.board));
    let clearedCount = 0;
    this.board.forEach((row, rI) => {
      if (row.every(val => val > 0)) {
        nb.splice(rI, 1);
        nb.unshift(Array(COLS).fill(0)); 
        clearedCount += 1;      
      }
    }) 
    this.updateGameProgress(clearedCount);
    this.board = nb;
  }

  updateGameProgress(newLinesCleared: number): void {
    if (newLinesCleared === 0) return;
    const clear = ['single', 'double', 'triple', 'tetris'][newLinesCleared-1];
    this.score += SCORES[clear] * this.level;
    this.linesCleared += newLinesCleared;
    if (this.linesCleared / this.LINES_PER_LEVEL >= this.level) {
      this.level += 1;
    }
  }

  updateShadowPiece() {
    this.shadowPiece = {...this.piece, color: {r: 35, g:35, b:35}};
    this.shadowPiece = this.drop(this.shadowPiece);
  }

  advanceGame() {
    if (this.gameOver) return;
     
    if (this.hasPieceLanded()) {
      this.freezePiece();
      this.clearLines();
    }
    else { 
      this.move(Move.down);
      this.score -= 1 * this.level;
    }
    this.updateShadowPiece()
  }

  loseGame() {
    this.gameOver = true;
    console.log ("gameOver")
  }
}