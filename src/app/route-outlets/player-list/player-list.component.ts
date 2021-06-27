import { Component, OnInit } from '@angular/core';
import { Player } from '../../services/steam-auth.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Faction } from '../campaign/campaign.component';
import { PlayerService } from '../../services/player.service';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, pluck, switchMap } from 'rxjs/operators';

@Component({
  selector: 'opt-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  public recruitPlayers: Player[] = [];
  public factionPlayers: Map<Faction['factionId'], Player> = new Map();
  public inactivePlayers: Player[] = [];
  public player$ = this.route.params.pipe(
    pluck('campaignId'),
    distinctUntilChanged(),
    switchMap((campaignId) => {
      return this.playerService.getPlayerList(campaignId);
    })
  );

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute
  ) {
    this.player$.subscribe((players) => {
      for (const player of players) {
        if (player.role === 'recruit') {
          this.recruitPlayers.push(player);
        } else if (player.role === 'guest') {
          this.inactivePlayers.push(player);
        } else {
          this.factionPlayers.set(player.defaultFactionId, player);
        }
      }
    });
  }

  ngOnInit(): void {}

  drop(event: CdkDragDrop<Player[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
