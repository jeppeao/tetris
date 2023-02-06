import { Component, Input } from '@angular/core';
import { SimpleChanges, OnChanges } from '@angular/core';
import { GameService } from '../game.service';
import { iPiece } from '../constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() blocksize: number = 0;
  @Input() onStartGameClick: () => void = () => {};
  @Input() onHighscoreClick: () => void = () => {};
  @Input() onNewGameClick: () => void = () => {};

  constructor(public game: GameService) {}

  processNext(next: number[][]): number[][] {
    return next.slice(0, 2);
  }
}
