import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../services/steam-auth.service';

@Component({
  selector: 'opt-player-card[player]',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent implements OnInit {
  @Input() player!: Player;

  constructor() {}

  ngOnInit(): void {}
}
