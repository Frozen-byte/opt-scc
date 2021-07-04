import { Injectable } from '@angular/core';
import { BattleId } from '../route-outlets/battle/battle.types';
import {
  Sector,
  SectorId,
} from '../components/sector-select/sector-select.component';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { isDefinedGuard } from '../toolbelt';
import { filter } from 'rxjs/operators';

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

  getBattleMap(battleId: BattleId): Observable<BattleMap> {
    return this.db
      .object<BattleMap>(`maps/${battleId}`)
      .valueChanges()
      .pipe(filter(isDefinedGuard));
  }

  setBattleMap(battleId: BattleId, battleMap: BattleMap): Promise<void> {
    return this.db.object<BattleMap>(`maps/${battleId}`).set(battleMap);
  }
}
