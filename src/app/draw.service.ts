import { Injectable } from '@angular/core';
import { iPiece, iColor, tetrisGame, COLORS } from './model';

@Injectable({
  providedIn: 'root'
})
export class DrawService {

  constructor() { }

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

  drawGame(game: tetrisGame, ctx: CanvasRenderingContext2D, blocksize: number) {
    this.clear(ctx);
    this.drawBoard(game.board, blocksize, ctx);
    this.drawPiece(game.shadowPiece, blocksize, ctx);
    this.drawPiece(game.piece, blocksize, ctx);
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


}
