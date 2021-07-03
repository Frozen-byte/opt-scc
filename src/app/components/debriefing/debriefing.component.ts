import { Component, Input } from '@angular/core';
import { Battle, BattleFaction } from '../../route-outlets/battle/battle.types';
import { BattleListService } from '../../services/battle-list.service';
import { first, pluck, switchMap, withLatestFrom } from 'rxjs/operators';
import { SectorService } from '../../services/sector.service';

type BattleWinner = BattleFaction | null;

@Component({
  selector: 'opt-debriefing[battle]',
  templateUrl: './debriefing.component.html',
  styleUrls: ['./debriefing.component.scss'],
})
export class DebriefingComponent {
  @Input() battle!: Battle;

  constructor(
    private battleListService: BattleListService,
    private sectorService: SectorService
  ) {}

  submitDebriefingFormGroup(): void {
    if (this.battle) {
      this.battleListService.patchBattle({
        battleId: this.battle.battleId,
        factions: this.battle.factions,
      });
    }
    // Update Sector for next Battle
    this.battleListService
      .getNextBattle(this.battle.battleDate)
      .valueChanges()
      .pipe(
        first(), // we only need the first event
        pluck(0), // first of Array (should be the only one by filter)
        withLatestFrom(this.sectorService.getBattleMap(this.battle.battleId)),
        switchMap(([nextBattle, currentBattleMap]) => {
          const winnerFaction = this.calculateBattleWinnerFaction(
            this.battle.factions
          );

          if (winnerFaction) {
            this.battle.factions.forEach(({ factionAttackingSector }) => {
              // ATTENTION mutating the object may causes side-effects
              currentBattleMap[factionAttackingSector].occupant =
                winnerFaction.factionSide;
              currentBattleMap[factionAttackingSector].selected = false;
            });
          }

          return this.sectorService.patchBattleMap(
            nextBattle.battleId,
            currentBattleMap
          );
        })
      )
      .subscribe();
  }

  /*
    returns `null` on a tie or the faction with the highest score
   */
  calculateBattleWinnerFaction(factions: BattleFaction[]): BattleWinner {
    let maxScore = 0;
    let winnerFaction: BattleWinner = null;

    factions.forEach((currentFaction) => {
      if (maxScore === currentFaction.factionBattleScore) {
        winnerFaction = null;
      } else if (maxScore < currentFaction.factionBattleScore) {
        winnerFaction = currentFaction;
        maxScore = currentFaction.factionBattleScore;
      }
    });

    return winnerFaction;
  }
}
