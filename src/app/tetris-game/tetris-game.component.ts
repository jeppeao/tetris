import { Component, HostListener } from '@angular/core';
import { COLS, ROWS, Move } from '../constants';
import { AfterContentInit } from '@angular/core';
import { DrawService } from '../draw.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-tetris-game',
  templateUrl: './tetris-game.component.html',
  styleUrls: ['./tetris-game.component.css']
})
export class TetrisGameComponent implements AfterContentInit {
 
  blocksize: number = 30;
  requestID: number = 0;
  time = {prev: 0, interval: 1000};
  menuOn: boolean = false;
  gameBoard = this.game.board;

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
      this.game.move(this.controls[event.code]);
      this.gameBoard = this.game.getGameBoard();
    }
  }
  constructor(private drawService: DrawService, public game: GameService) {}

  ngAfterContentInit(): void {
    this.calculateBlocksize();
    this.loop();
    this.game.resetBoard();
  }
 
  getNextCanvasWidth(): string {
    return (this.blocksize * 4 + 10).toString() + "px";
  }

  calculateBlocksize() {
    const h = Math.floor((window.innerHeight) / ROWS);
    const w = Math.floor((window.innerWidth - 150) / COLS);
    const smallest = Math.min(h, w);
    let newsize =  Math.floor(smallest / 10) * 10;
    this.blocksize = newsize;
  }

  updateCanvasDimensions(ctx: CanvasRenderingContext2D) {
    ctx.canvas.width = this.blocksize * COLS;
    ctx.canvas.height = this.blocksize * ROWS;
  }

  loop(now = 0) {
    const t = this.time.interval * this.game.TIMING_FACTOR ** this.game.level;
    if(now  - this.time.prev > t && this.game.state === 'running') {
      this.time.prev = now;
      this.game.advanceGame();
      this.calculateBlocksize();
      this.gameBoard = this.game.getGameBoard();
    }
    this.requestID = window.requestAnimationFrame(this.loop.bind(this));
  }

  toggleMenu(): void {
    this.menuOn = !this.menuOn;
    if (this.game.isPaused() !== this.menuOn) {
      this.game.togglePaused();
    }
  }

  newGame(): void {
    this.game.newGame();
    this.calculateBlocksize();
    if (this.menuOn === true) {
      this.toggleMenu();
    }
  }

  onStartGameClick() {
    this.game.beginGame();
    this.menuOn = false;
  }

}
