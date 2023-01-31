import { Injectable } from '@angular/core';

interface Score{
  player: string,
  points: number
}

@Injectable({
  providedIn: 'root'
})
export class HighscoreService {
  
  constructor() { }

  getHighscores() {
    return JSON.parse(localStorage.getItem('tetris-app-highscores') || '[]'); 
  }
  
  setHighscore(score: Score) {
    const points = score.points;
    const name = score.player || 'Anon'; 
    let highscores = JSON.parse(localStorage.getItem('tetris-app-highscores') || '[]'); 
    highscores.push({player: name, points: points});
    highscores = this.trimHighscores(highscores);
    localStorage.setItem('tetris-app-highscores', JSON.stringify(highscores));
  }

  sortHighscores(scores: Score[]) {
    return scores.sort((a, b) => {
      return b.points - a.points;
    })
  }

  trimHighscores(scores: Score[]) {
    return this.sortHighscores(scores).slice(0,8);
  }

}
