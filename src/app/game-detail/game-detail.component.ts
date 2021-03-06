import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Game } from '../game.model';
import { GameService } from '../game.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css'],
  providers: [GameService]
})
export class GameDetailComponent implements OnInit {
  games:FirebaseListObservable<any[]>;

  gameId: string;
  gameToDisplay: Game;
  currentRoute: string = this.router.url;

  constructor(private route: ActivatedRoute, private location: Location, private gameService: GameService, private router: Router) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.gameId = urlParameters['id'];
        });
         this.gameService.getGameById(this.gameId).subscribe(dataLastEmittedFromObserver => {
         this.gameToDisplay = new Game
         (dataLastEmittedFromObserver.names,
         dataLastEmittedFromObserver.numberPlayers,
         dataLastEmittedFromObserver.date,
         dataLastEmittedFromObserver.time,
         dataLastEmittedFromObserver.location)
       })
       this.games = this.gameService.getGames();
  }

  beginUpdatingGame(gameToUpdate, addedPlayer){
   this.gameService.updateGame(gameToUpdate, addedPlayer);
 }
}
