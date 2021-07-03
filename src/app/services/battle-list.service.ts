import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Battle } from '../route-outlets/battle/battle.types';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { DATE_ISO8601 } from '../route-outlets/campaign/campaign.component';

function sortBattlesByDate(a: Battle, b: Battle): number {
  // ISO Date sorts Lexicographically https://stackoverflow.com/a/12192544
  return a.battleDate < b.battleDate ? -1 : a.battleDate > b.battleDate ? 1 : 0;
}

@Injectable({
  providedIn: 'root',
})
export class BattleListService {
  constructor(public db: AngularFireDatabase) {}

  getBattles(campaignId: Battle['campaignId']): Observable<Battle[]> {
    return this.db
      .list<Battle>('battles', (ref) =>
        ref.orderByChild('campaignId').equalTo(campaignId)
      )
      .valueChanges()
      .pipe(map((battles) => battles.sort(sortBattlesByDate)));
  }

  getBattle(battleId: Battle['battleId']): Observable<Battle | null> {
    return this.db.object<Battle>(`battles/${battleId}`).valueChanges();
  }

  /*
   * battleID is required for the partial Battle object you pass
   */
  patchBattle(
    battle: Partial<Battle> & Required<{ battleId: Battle['battleId'] }>
  ): Promise<void> {
    return this.db.object<Battle>(`battles/${battle.battleId}`).update(battle);
  }

  getNextBattle(date: DATE_ISO8601): AngularFireList<Battle> {
    return this.db.list<Battle>(`battles`, (ref) =>
      ref.orderByChild('battleDate').startAfter(date).limitToFirst(1)
    );
  }
}
