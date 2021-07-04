import { Injectable } from '@angular/core';
import {
  filter,
  first,
  map,
  pluck,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import {
  Battle,
  BattleFaction,
  BattleId,
} from '../route-outlets/battle/battle.types';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import {
  DATE_ISO8601,
  FactionId,
} from '../route-outlets/campaign/campaign.component';
import { SectorId } from '../components/sector-select/sector-select.component';
import { SectorService } from './sector.service';
import { isDefinedGuard } from '../toolbelt';

function sortBattlesByDate(a: Battle, b: Battle): number {
  // ISO Date sorts Lexicographically https://stackoverflow.com/a/12192544
  return a.battleDate < b.battleDate ? -1 : a.battleDate > b.battleDate ? 1 : 0;
}

type BattleWinner = BattleFaction | null;

/*
  returns `null` on a tie or the faction with the highest score
 */
export function calculateBattleWinnerFaction(
  factions: Battle['factions']
): BattleWinner {
  let maxScore = 0;
  let winnerFaction: BattleWinner = null;

  Object.values(factions).forEach((currentFaction) => {
    if (maxScore === currentFaction.factionBattleScore) {
      winnerFaction = null;
    } else if (maxScore < currentFaction.factionBattleScore) {
      winnerFaction = currentFaction;
      maxScore = currentFaction.factionBattleScore;
    }
  });

  return winnerFaction;
}

@Injectable({
  providedIn: 'root',
})
export class BattleListService {
  constructor(
    private db: AngularFireDatabase,
    private sectorService: SectorService
  ) {}

  getBattles(campaignId: Battle['campaignId']): Observable<Battle[]> {
    return this.db
      .list<Battle>('battles', (ref) =>
        ref.orderByChild('campaignId').equalTo(campaignId)
      )
      .valueChanges()
      .pipe(map((battles) => battles.sort(sortBattlesByDate)));
  }

  getBattle(battleId: BattleId): Observable<Battle | null> {
    return this.db.object<Battle>(`battles/${battleId}`).valueChanges();
  }

  /*
   * battleID is required for the partial Battle object you pass
   */
  patchBattle(
    battle: Partial<Battle> & Required<{ battleId: BattleId }>
  ): Promise<void> {
    return this.db.object<Battle>(`battles/${battle.battleId}`).update(battle);
  }

  saveAttackingSector(
    battle: Battle,
    factionId: FactionId,
    factionAttackingSector: SectorId
  ): Promise<void[]> {
    if (!battle) {
      return Promise.reject('missing campaignId');
    } else if (!factionId) {
      return Promise.reject('missing factionId');
    }

    const patchQueue: Promise<void>[] = [];

    // unset current sector
    if (battle.factions[factionId].factionAttackingSector) {
      patchQueue.push(
        this.sectorService.patchSector(battle.battleId, {
          sectorId: battle.factions[factionId].factionAttackingSector,
          selected: false,
        })
      );
    }

    // set new sector
    patchQueue.push(
      this.db
        .object(
          `battles/${battle.battleId}/factions/${factionId}/factionAttackingSector`
        )
        .set(factionAttackingSector)
    );
    patchQueue.push(
      this.sectorService.patchSector(battle.battleId, {
        sectorId: factionAttackingSector,
        selected: true,
      })
    );

    return Promise.all(patchQueue);
  }

  saveDebriefing(currentBattle: Battle): Promise<void[]> {
    const nextBattle$ = this.getNextBattle(currentBattle.battleDate);

    return Promise.all([
      this.patchBattle({
        battleId: currentBattle.battleId,
        factions: currentBattle.factions,
        battleStatus: 'decided',
      }),
      nextBattle$
        .pipe(
          withLatestFrom(
            this.sectorService
              .getBattleMap(currentBattle.battleId)
              .pipe(filter(isDefinedGuard))
          ),
          first(),
          switchMap(([nextBattle, currentBattleMap]) =>
            this.sectorService.setNextBattleMap(
              currentBattle,
              nextBattle,
              currentBattleMap
            )
          )
        )
        .toPromise(),
      nextBattle$
        .pipe(
          switchMap((nextBattle) =>
            this.patchBattle({
              battleId: nextBattle.battleId,
              battleStatus: 'planning',
            })
          )
        )
        .toPromise(),
    ]);
  }

  /*
    Return the nearest Battle by date in the future
  */
  getNextBattle(date: DATE_ISO8601): Observable<Battle> {
    return this.db
      .list<Battle>(`battles`, (ref) =>
        ref.orderByChild('battleDate').startAfter(date).limitToFirst(1)
      )
      .valueChanges()
      .pipe(pluck(0)); // limitToFirst(0) returns an Array with one Element
  }

  /*
   Return the nearest Battle by date in the past
  */
  getPreviousBattle(date: DATE_ISO8601): Observable<Battle> {
    return this.db
      .list<Battle>(`battles`, (ref) =>
        ref.orderByChild('battleDate').endBefore(date).limitToLast(1)
      )
      .valueChanges()
      .pipe(pluck(0)); // limitToLast(0) returns an Array with one Element
  }
}
