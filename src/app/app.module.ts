import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GameService } from './game.service';
import { AppComponent } from './app.component';
import { TetrisGameComponent } from './tetris-game/tetris-game.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HighscoreComponent } from './highscore/highscore.component';

@NgModule({
  declarations: [
    AppComponent,
    TetrisGameComponent,
    SidebarComponent,
    HighscoreComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
