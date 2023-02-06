import {
   Component,
   ElementRef, 
   ViewChild, 
   AfterContentInit, 
   Input, 
   OnChanges, 
   SimpleChanges
} from '@angular/core';
import { DrawService } from '../draw.service';

@Component({
  selector: 'app-board-canvas',
  templateUrl: './board-canvas.component.html',
  styleUrls: ['./board-canvas.component.css']
})
export class BoardCanvasComponent implements AfterContentInit, OnChanges {

  @Input() board: number[][] = [];
  @Input() blockSize = 0;
  @Input() drawBackground = true;
  @ViewChild('canvas', {static: true}) canvas: ElementRef = {} as ElementRef;
  ctx: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;

  constructor(private draw: DrawService) {}

  ngAfterContentInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.updateCanvas();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateCanvas();
  }

  updateCanvas() {
    if (this.ctx.fillRect === undefined) return;
    this.ctx.canvas.width = this.board[0].length * this.blockSize;
    this.ctx.canvas.height = this.board.length * this.blockSize;
    this.draw.drawBoard(this.board, this.blockSize, this.ctx, this.drawBackground);
  }
}
