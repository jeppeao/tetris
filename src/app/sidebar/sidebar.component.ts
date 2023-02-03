import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SimpleChanges, OnChanges } from '@angular/core';
import { DrawService } from '../draw.service';
import { GameService } from '../game.service';
import { iPiece } from '../constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() nextPiece: iPiece = this.game.nextPiece;
  @Input() blocksize: number = 0;
  @Input() onStartGameClick: () => void = () => {};
  @Input() onHighscoreClick: () => void = () => {};
  @Input() onNewGameClick: () => void = () => {};

  constructor(public game: GameService) {}
}
