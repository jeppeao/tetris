export const COLS: number = 10;
export const ROWS: number = 15;

export interface iColor {
  r: number,
  g: number,
  b: number
}

export const COLORS = [
  {r: 20, g: 225, b: 225}, //'cyan',
  {r: 3, g: 65, b: 174}, //'blue',
  {r: 235, g: 151, b: 28}, //'orange',
  {r: 235, g: 230, b: 30}, //'yellow',
  {r: 114, g: 203, b: 59}, //'green',
  {r: 180, g: 30, b: 180}, //'purple',
  {r: 225, g: 50, b: 19}, //'red'
  {r: 35, g:35, b:35}, // shadow
];

export const SHAPES = [
  [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  [[2, 0, 0], [2, 2, 2]],
  [[0, 0, 3], [3, 3, 3]],
  [[4, 4], [4, 4]],
  [[0, 5, 5], [5, 5, 0]],
  [[0, 6, 0], [6, 6, 6]],
  [[7, 7, 0], [0, 7, 7]],
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

export const SCORES: {[key: string]: number} = {
  drop: 2, 
  movedown: 1,
  single: 100,
  double: 300,
  triple: 500,
  tetris: 800 
}

