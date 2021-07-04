import { Component, Input } from '@angular/core';
import { Battle } from '../../route-outlets/battle/battle.types';
import { BattleListService } from '../../services/battle-list.service';

@Component({
  selector: 'opt-debriefing[battle]',
  templateUrl: './debriefing.component.html',
  styleUrls: ['./debriefing.component.scss'],
})
export class DebriefingComponent {
  @Input() battle!: Battle;

  constructor(private battleListService: BattleListService) {}

  submitDebriefingFormGroup(): void {
    if (this.battle) {
      this.battleListService.saveDebriefing(this.battle);
    }
  }
}
