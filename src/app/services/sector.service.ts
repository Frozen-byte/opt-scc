import { Injectable } from '@angular/core';
import { Battle, BattleId } from '../route-outlets/battle/battle.types';
import {
  Sector,
  SectorId,
} from '../components/sector-select/sector-select.component';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { calculateBattleWinnerFaction } from './battle-list.service';
import { cloneDeep } from 'lodash';

export type BattleMap = Record<SectorId, Sector>;

@Injectable({
  providedIn: 'root',
})
export class SectorService {
  constructor(private db: AngularFireDatabase) {}

  patchSector(
    battleId: BattleId,
    sector: Partial<Sector> & { sectorId: SectorId }
  ): Promise<void> {
    return this.db
      .object<Sector>(`maps/${battleId}/${sector.sectorId}`)
      .update(sector);
  }

  getBattleMap(battleId: BattleId): Observable<BattleMap | null> {
    return this.db.object<BattleMap>(`maps/${battleId}`).valueChanges();
  }

  setBattleMap(battleId: BattleId, battleMap: BattleMap): Promise<void> {
    return this.db.object<BattleMap>(`maps/${battleId}`).set(battleMap);
  }

  public setNextBattleMap(
    currentBattle: Battle,
    nextBattle: Battle,
    currentBattleMap: BattleMap
  ): Promise<void> {
    const nextBattleMap = cloneDeep(currentBattleMap);

    const winnerFaction = calculateBattleWinnerFaction(currentBattle.factions);

    /*
    Generate the new BattleMap
    copy old values, then mutate the played ones
    this mutation includes:
    * determine new occupants (on a tie, do nothing)
    * unselect the sector
    * increment playedCount
    * disable if sector was played twice (burned sector)
   */
    Object.values(currentBattle.factions).forEach(
      ({ factionAttackingSector }) => {
        const currentSector = currentBattleMap[factionAttackingSector];
        const nextSector = nextBattleMap[factionAttackingSector];
        // determine new occupants (leave on a tie)
        nextSector.occupant =
          winnerFaction?.factionSide ?? currentSector.occupant;
        // unselect the sector
        nextSector.selected = false;
        // increment playedCount (create if not existing)
        nextSector.playedCount = (currentSector.playedCount || 0) + 1;
        // disable if sector was played twice
        nextSector.disabled = nextSector.playedCount >= 2;
      }
    );

    // tiny hack that checks for pre-existing attacking Sectors to save some time in dev
    Object.values(nextBattle.factions).forEach(
      ({ factionAttackingSector: nextBattleFactionAttackingSector }) => {
        if (nextBattleFactionAttackingSector) {
          nextBattleMap[nextBattleFactionAttackingSector].selected = true;
        }
      }
    );

    return this.setBattleMap(nextBattle.battleId, nextBattleMap);
  }
}
