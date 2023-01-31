import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { COLS, ROWS, Move, iPiece } from '../constants';
import { AfterContentInit } from '@angular/core';
import { DrawService } from '../draw.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-tetris-game',
  templateUrl: './tetris-game.component.html',
  styleUrls: ['./tetris-game.component.css']
})
export class TetrisGameComponent implements AfterContentInit {
  @ViewChild('board', { static: true }) canvas: 
    ElementRef<HTMLCanvasElement> = {} as ElementRef<HTMLCanvasElement>;
  
  ctx: CanvasRenderingContext2D | null = {} as CanvasRenderingContext2D;
  blocksize: number = 30;
  requestID: number = 0;
  time = {prev: 0, interval: 1000};
  score = this.game.score || 0;
  linesCleared = this.game.linesCleared || 0;
  level = this.game.level || 1;
  nextPiece: iPiece = {} as iPiece;
  paused: boolean = false;
  menuOn: boolean = false;

  controls: {[key: string]: Move } = {
    "ArrowUp": Move.rotateClockwise,
    "KeyX": Move.rotateClockwise,
    "KeyZ": Move.rotateCounterclockwise,
    "ArrowLeft": Move.left,
    "ArrowRight": Move.right,
    "ArrowDown": Move.down,
    "Space": Move.drop
  };

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.code in this.controls) {
      this.game.move(this.controls[event.code])
      if (this.ctx) { 
        this.drawService.drawGame(this.game, this.ctx, this.blocksize)
      }
    }
  }
  constructor(private drawService: DrawService, public game: GameService) {}

  ngAfterContentInit(): void {
    this.initGame();
    this.game.resetBoard();
  }
 
  getNextCanvasWidth(): string {
    return (this.blocksize * 4 + 10).toString() + "px";
  }

  initGame() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.updateGameInfo();

    if (this.ctx) {
      this.updateCanvasDimensions(this.ctx); 
      this.drawService.drawPiece(this.game.piece, 20, this.ctx);
      this.drawService.drawBoard(this.game.board, this.blocksize, this.ctx)

    }
    this.loop();
  }

  calculateBlocksize() {
    const h = Math.floor((window.innerHeight) / ROWS);
    const w = Math.floor((window.innerWidth - 150) / COLS);
    const smallest = Math.min(h, w);
    let newsize =  Math.floor(smallest / 10) * 10;
    this.blocksize = newsize;
  
    if (this.ctx) {
      this.updateCanvasDimensions(this.ctx);
    }
  }

  updateCanvasDimensions(ctx: CanvasRenderingContext2D) {
    ctx.canvas.width = this.blocksize * COLS;
    ctx.canvas.height = this.blocksize * ROWS;
  }

  loop(now = 0) {
    const t = this.time.interval * this.game.TIMING_FACTOR ** this.game.level;
    if(now  - this.time.prev > t && this.paused===false) {
      this.time.prev = now;
      this.game.advanceGame();
      this.updateGameInfo();
      if (this.ctx) {
        this.drawService.drawGame(this.game, this.ctx, this.blocksize)
      }
    }
    this.requestID = window.requestAnimationFrame(this.loop.bind(this));
  }

  updateGameInfo() {
    this.score = this.game.score || 0;
    this.linesCleared = this.game.linesCleared || 0;
    this.level = this.game.level || 1;
    this.nextPiece = this.game.nextPiece;
    this.calculateBlocksize();
  }

  toggleMenu(): void {
    this.togglePaused();
    this.menuOn = !this.menuOn;
  }

  togglePaused(): void {
    this.paused = !this.paused;
  }

  newGame(): void {
    this.game.newGame();
    this.updateGameInfo();
    if (this.ctx) {
      this.drawService.drawGame(this.game, this.ctx, this.blocksize)
    }
  }
}
