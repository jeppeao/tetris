import { Injectable } from '@angular/core';
import { GameService } from './game.service';
import { iPiece, iColor, COLORS} from './constants';

const BLOCK_LETTERS: {[key: string]: number[][]} = {
  T: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0]
  ],
  
  E: [
    [3, 3, 3, 3],
    [3, 0, 0, 0],
    [3, 3, 3, 3],
    [3, 0, 0, 0],
    [3, 3, 3, 3]
  ],
  
  R: [
    [2, 2, 2, 0],
    [2, 0, 0, 2],
    [2, 2, 2, 0],
    [2, 0, 0, 2],
    [2, 0, 0, 2]
  ],
  
  I: [
   [4, 4, 4],
   [0, 4, 0],
   [0, 4, 0],
   [0, 4, 0],
   [4, 4, 4]
  ],
  
  S: [
    [5, 5 ,5, 5],
    [5, 0, 0, 0],
    [5, 5 ,5, 5],
    [0, 0, 0, 5],
    [5, 5 ,5, 5],
   ],
  
  T2: [
    [6, 6, 6, 6, 6],
    [0, 0, 6, 0, 0],
    [0, 0, 6, 0, 0],
    [0, 0, 6, 0, 0],
    [0, 0, 6, 0, 0]
  ],
  
  H: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1]
  ],
  
  G: [
    [3, 3, 3, 3, 0],
    [3, 0, 0, 0, 0],
    [3, 0, 3, 3, 3],
    [3, 0, 0, 0, 3],
    [3, 3, 3, 3, 3]
  ],
  
  O: [
    [0, 6, 6, 6, 0],
    [6, 0, 0, 0, 6],
    [6, 0, 0, 0, 6],
    [6, 0, 0, 0, 6],
    [0, 6, 6, 6, 0]
  ],
  
  C: [
    [0, 4, 4, 4, 0],
    [4, 0, 0, 0, 4],
    [4, 0, 0, 0, 0],
    [4, 0, 0, 0, 4],
    [0, 4, 4, 4, 0]
  ],
  
  GAP: [
    [0],
    [0],
    [0],
    [0],
    [0]
  ]
};

@Injectable({
  providedIn: 'root'
})
export class DrawService {

  constructor(private game: GameService) { }

  clear(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  drawTriangle(
    x1: number, y1: number, 
    x2: number, y2: number,
    x3: number, y3: number,
    c: iColor,
    ctx: CanvasRenderingContext2D
  ) {
    ctx.fillStyle = this.getRGB(c);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
  }

  drawBlock(
    x: number, y: number,
    size: number, c: iColor,
    ctx: CanvasRenderingContext2D
  ) {
    const border = Math.floor(size * 0.1);
    const lighterShade = this.modulate(c, 1.2);
    const darkerShade = this.modulate(c, 0.8);

    ctx.fillStyle = this.getRGB(lighterShade);
    ctx.fillRect(x, y, size, size);
    this.drawTriangle(x, y+size , x+size, y+size, x+size, y, darkerShade, ctx);
    ctx.fillStyle = this.getRGB(c);
    ctx.fillRect(x+border, y+border, size-border*2, size-border*2);
  }

  drawBoard(board: number[][], size: number, ctx: CanvasRenderingContext2D, bg = true) {
    board.forEach((row, dy) => {
      row.forEach((val, dx) => {

        const x = dx * size;
        const y = dy * size;
        let color = COLORS[val-1];
        color = val === 0 ? {r: 50, g: 50, b: 50} : color;
        if (val != 0 || bg === true) {
         this.drawBlock(x, y, size, color, ctx);
        }
      });
    });
  }

  drawPiece(p: iPiece, blockSize: number, ctx: CanvasRenderingContext2D) {
    p.shape.forEach((col, dy) => {
      col.forEach((val, dx) => {
        if (val > 0 ) {
          const x = (p.x + dx) * blockSize;
          const y = (p.y + dy) * blockSize;
          this.drawBlock(x, y, blockSize, p.color, ctx);
        }
      });
    });
  }

  drawShape(p: iPiece, blockSize: number, ctx: CanvasRenderingContext2D) {
    p.shape.forEach((col, dy) => {
      col.forEach((val, dx) => {
        if (val > 0 ) {
          const x = dx * blockSize;
          const y = dy * blockSize;
          this.drawBlock(x, y, blockSize, p.color, ctx);
        }
      });
    });
  }

  getRGB(c: iColor): string {
    return `rgb(${c.r}, ${c.g}, ${c.b})`;
  }

  modulate(c: iColor, f: number): iColor {
    return {r: c.r * f, g: c.g * f, b: c.b * f};
  }
  
  wordToBoard(w: string) {
    const b: number[][] = [];
    const g = BLOCK_LETTERS['GAP'];
    for (let ltr of w) {
      const larr = BLOCK_LETTERS[ltr];
      for (let j=0; j<larr[0].length; j++) {
        b.push([]);
        for (let i=0; i<larr.length; i++) {
          b[j] = b[j].concat(larr[i][j]);
        }
      } 
    }
  }
}
