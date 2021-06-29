import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../services/steam-auth.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FactionId } from '../../route-outlets/campaign/campaign.component';
import { PlayerService } from '../../services/player.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'opt-player-list[campaignId][factionId]',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  @Input() campaignId!: string;
  @Input() factionId!: FactionId;

  public players$?: Observable<Player[]>;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    // TODO: move to ngOnChanges
    this.players$ = this.playerService
      .getPlayerList(this.campaignId, (ref) =>
        ref.orderByChild('defaultFactionId').equalTo(this.factionId)
      )
      .valueChanges();
  }

  drop(event: CdkDragDrop<Player[]>): void {
    // TODO: avoid the flicker: remove original element until move is done
    this.playerService.patchPlayer(this.campaignId, {
      defaultFactionId: this.factionId,
      fireAuthUid: event.item.data.fireAuthUid,
    });
  }
}
