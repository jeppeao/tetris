import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { HighscoreService } from '../highscore.service';
@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.css']
})
export class GameOverComponent implements OnChanges {

  @Input() score: number = 0;
  name: string = ""; 

  @ViewChild('addHighscore', {'static': true}) highscoreInput: 
  ElementRef<HTMLDivElement> = {} as ElementRef<HTMLDivElement>;

  constructor(private highscore: HighscoreService) {}

  onAdd() {
    if (this.name !== "") {
      this.highscore.setHighscore({player: this.name, points: this.score});
      this.highscoreInput.nativeElement.style.display = 'none';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.highscoreInput.nativeElement.style.display = 'flex';
  }
}
