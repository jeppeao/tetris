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
export class SidebarComponent implements AfterViewInit, OnChanges {
  nextPiece: iPiece = this.game.nextPiece;
  @Input() blocksize: number = 0;
  @Input() onStartGameClick: () => void = () => {};
  @Input() onHighscoreClick: () => void = () => {};
  @Input() onNewGameClick: () => void = () => {};

  @ViewChild('nextPiece', { static: true }) canvasNext:
  ElementRef<HTMLCanvasElement> = {} as ElementRef<HTMLCanvasElement>;
  ctxNext: CanvasRenderingContext2D | null = {} as CanvasRenderingContext2D;

  constructor(private drawService: DrawService, public game: GameService) {}

  ngAfterViewInit() {
    this.initSidebar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateCanvasNext();
  }

  initSidebar() {
    this.ctxNext = this.canvasNext.nativeElement.getContext('2d');
    this.updateCanvasNext();
  }

  updateCanvasNext() {
    if (this.ctxNext && this.ctxNext.canvas && this.nextPiece.shape) {
      this.drawService.clear(this.ctxNext);
      this.ctxNext.canvas.width = (this.blocksize-10) * this.nextPiece.shape[0].length;
      this.ctxNext.canvas.height = (this.blocksize-10) * this.nextPiece.shape.length
      this.drawService.drawShape(this.nextPiece, this.blocksize-10, this.ctxNext);
    }
  }

}
