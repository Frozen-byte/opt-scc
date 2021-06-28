import { Component, Input } from '@angular/core';
import { Player } from '../../../services/steam-auth.service';

@Component({
  selector: 'opt-player-card-avatar[photoUrl]',
  templateUrl: './player-card-avatar.component.html',
  styleUrls: ['./player-card-avatar.component.scss'],
})
export class PlayerCardAvatarComponent {
  @Input() photoUrl!: Player['photoUrl'];
}
