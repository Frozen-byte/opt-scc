import { Component, Input, OnInit } from '@angular/core';
import { Battle } from '../../route-outlets/battle/battle.types';

@Component({
  selector: 'opt-battle-link',
  templateUrl: './battle-link.component.html',
  styleUrls: ['./battle-link.component.scss'],
})
export class BattleLinkComponent implements OnInit {
  @Input() battle?: Battle;

  constructor() {}

  ngOnInit(): void {}
}
