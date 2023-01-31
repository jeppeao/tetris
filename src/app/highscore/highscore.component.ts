import { Component, Input, HostListener, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { DrawService } from '../draw.service';
import { HighscoreService } from '../highscore.service'

const T = [
  [1, 1, 1, 1, 1],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0]
];

const E = [
  [3, 3, 3, 3],
  [3, 0, 0, 0],
  [3, 3, 3, 3],
  [3, 0, 0, 0],
  [3, 3, 3, 3]
];

const R = [
  [2, 2, 2, 0],
  [2, 0, 0, 2],
  [2, 2, 2, 0],
  [2, 0, 0, 2],
  [2, 0, 0, 2]
];

const I = [
 [4, 4, 4],
 [0, 4, 0],
 [0, 4, 0],
 [0, 4, 0],
 [4, 4, 4]
];

const S = [
  [5, 5 ,5, 5],
  [5, 0, 0, 0],
  [5, 5 ,5, 5],
  [0, 0, 0, 5],
  [5, 5 ,5, 5],
 ];

 const T2 = [
  [6, 6, 6, 6, 6],
  [0, 0, 6, 0, 0],
  [0, 0, 6, 0, 0],
  [0, 0, 6, 0, 0],
  [0, 0, 6, 0, 0]
];

const H = [
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1]
];

const G = [
  [3, 3, 3, 3, 0],
  [3, 0, 0, 0, 0],
  [3, 0, 3, 3, 3],
  [3, 0, 0, 0, 3],
  [3, 3, 3, 3, 3]
];

const O = [
  [0, 6, 6, 6, 0],
  [6, 0, 0, 0, 6],
  [6, 0, 0, 0, 6],
  [6, 0, 0, 0, 6],
  [0, 6, 6, 6, 0]
];

const C = [
  [0, 4, 4, 4, 0],
  [4, 0, 0, 0, 4],
  [4, 0, 0, 0, 0],
  [4, 0, 0, 0, 4],
  [0, 4, 4, 4, 0]
]

const GAP = [
  [0],
  [0],
  [0],
  [0],
  [0]
];

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.css']
})
export class HighscoreComponent implements AfterContentInit {

  //title = [T, GAP, E, GAP, T2, GAP, R, GAP, I, GAP, S];
  title = [H, I, G, H, S, C, O, R, E].map(ltr => [ltr, GAP]).flat();
  

  @ViewChild('mainMenu') mainMenu: 
    ElementRef<HTMLDivElement> = {} as ElementRef<HTMLDivElement>;

  @ViewChild('titleBoard', { static: true }) canvas: 
    ElementRef<HTMLCanvasElement> = {} as ElementRef<HTMLCanvasElement>;
    ctx: CanvasRenderingContext2D | null = {} as CanvasRenderingContext2D;

  @Input() onResize: () => void = () => {};


  constructor(private drawService: DrawService, public highscore: HighscoreService) {}

  constructTitleBoard(): number[][] {
    let tb: number[][] = [];
    for (let j=0; j<this.title[0].length; j++) {
      tb.push([]);
      for (let i=0; i<this.title.length; i++) {
        tb[j] = tb[j].concat(this.title[i][j]);
      }
    }
    return tb;
  }

  @HostListener('window:resize', ['$event'])
  onResizeEvent(event: Event) {
     this.updateCanvasSize();
     this.onResize();
  }

  ngAfterContentInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.updateCanvasSize();
  }

  updateCanvasSize() {
    const bs = window.innerWidth / this.constructTitleBoard()[0].length;
    if (this.ctx) {
      this.ctx.canvas.width = bs * this.constructTitleBoard()[0].length;
      this.ctx.canvas.height = bs * this.constructTitleBoard().length;
      this.drawService.drawBoard(
        this.constructTitleBoard(), bs, this.ctx, false
      );
    }
  }
}
