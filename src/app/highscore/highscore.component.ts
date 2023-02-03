import { Component, Input, HostListener} from '@angular/core';
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
export class HighscoreComponent {

  //title = [T, GAP, E, GAP, T2, GAP, R, GAP, I, GAP, S];
  title = [H, I, G, H, S, C, O, R, E].map(ltr => [ltr, GAP]).flat();
  highscores = this.highscore.getHighscores();
  blockSize = 0;
  @Input() onResize: () => void = () => {};

  constructor(private drawService: DrawService, public highscore: HighscoreService) {
    this.updateBlockSize();
  }

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
     this.updateBlockSize();
     this.onResize();
  }

  updateBlockSize() {
    this.blockSize = window.innerWidth / this.constructTitleBoard()[0].length;
  }
}
