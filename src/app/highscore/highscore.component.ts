import { Component, Input, HostListener } from '@angular/core';
import { DrawService } from '../draw.service';
import { HighscoreService } from '../highscore.service'

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.css']
})
export class HighscoreComponent {

  title = 'HIGHSCORE';
  titleBoard = this.drawService.wordToBoard(this.title);
  highscores = this.highscore.getHighscores();
  blockSize = 0;
  @Input() onResize: () => void = () => { };

  constructor(private drawService: DrawService, public highscore: HighscoreService) {
    this.updateBlockSize();
  }

  @HostListener('window:resize', ['$event'])
  onResizeEvent(event: Event) {
    this.updateBlockSize();
    this.onResize();
  }

  updateBlockSize() {
    this.blockSize = window.innerWidth / this.titleBoard.length;
  }
}
