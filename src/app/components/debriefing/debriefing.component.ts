import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Battle } from '../../route-outlets/battle/battle.types';
import { BattleListService } from '../../services/battle-list.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { pluck, switchMap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'opt-debriefing',
  templateUrl: './debriefing.component.html',
  styleUrls: ['./debriefing.component.scss'],
})
export class DebriefingComponent implements OnChanges, OnDestroy {
  @Input() battleId?: Battle['battleId'];
  changes$ = new EventEmitter<SimpleChanges>();
  public factions: Battle['factions'] = [];

  constructor(public battleListService: BattleListService) {
    this.changes$
      .pipe(
        pluck('battleId'),
        switchMap((battleId) =>
          this.battleListService.getBattle(battleId?.currentValue)
        ),
        untilDestroyed(this)
      )
      .subscribe((battle) => {
        this.factions = battle?.factions ?? [];
      });
  }

  ngOnDestroy(): void {
    this.changes$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changes$.next(changes);
  }

  submitDebriefingFormGroup(): void {
    if (this.battleId) {
      this.battleListService.patchBattle({
        battleId: this.battleId,
        factions: this.factions,
      });
    }
  }
}
