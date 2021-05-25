import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { BattleFaction } from '../battle/battle.types';

@Component({
  selector: 'opt-faction-score',
  templateUrl: './faction-score.component.html',
  styleUrls: ['./faction-score.component.scss'],
})
export class FactionScoreComponent implements OnInit {
  @Input() faction?: BattleFaction;
  @Input() @HostBinding('class.reverse') reverse?: string | boolean;

  constructor() {}

  ngOnInit(): void {
    this.reverse = this.reverse !== undefined;
  }
}
