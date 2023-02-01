import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GameService } from './game.service';
import { AppComponent } from './app.component';
import { TetrisGameComponent } from './tetris-game/tetris-game.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HighscoreComponent } from './highscore/highscore.component';
import { GameOverComponent } from './game-over/game-over.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TetrisGameComponent,
    SidebarComponent,
    HighscoreComponent,
    GameOverComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
