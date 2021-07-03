import { Injectable } from '@angular/core';
import { Battle } from '../route-outlets/battle/battle.types';
import { Sector } from '../components/sector-select/sector-select.component';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { isDefinedGuard } from '../toolbelt';
import { filter } from 'rxjs/operators';

export type BattleMap = Record<Sector['sectorId'], Sector>;

@Injectable({
  providedIn: 'root',
})
export class SectorService {
  constructor(private db: AngularFireDatabase) {}

  patchBattleMap(
    battleId: Battle['battleId'],
    sectors: BattleMap
  ): Promise<void> {
    return this.db.object<BattleMap>(`maps/${battleId}`).update(sectors);
  }

  getBattleMap(battleId: Battle['battleId']): Observable<BattleMap> {
    return this.db
      .object<BattleMap>(`maps/${battleId}`)
      .valueChanges()
      .pipe(filter(isDefinedGuard));
  }
}
