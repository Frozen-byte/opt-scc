import { Component, Input } from '@angular/core';
import { Player } from '../../../services/steam-auth.service';

@Component({
  selector: 'opt-player-card-name[displayName]',
  templateUrl: './player-card-name.component.html',
  styleUrls: ['./player-card-name.component.scss'],
})
export class PlayerCardNameComponent {
  @Input() displayName!: Player['displayName'];
  @Input() factionId?: Player['defaultFactionId'];
}
