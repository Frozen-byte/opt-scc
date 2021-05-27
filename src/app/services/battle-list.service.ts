import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Battle } from '../route-outlets/battle/battle.types';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

function sortBattlesByDate(a: Battle, b: Battle): number {
  // ISO Date sorts Lexicographically https://stackoverflow.com/a/12192544
  return a.battleDate < b.battleDate ? -1 : a.battleDate > b.battleDate ? 1 : 0;
}

@Injectable({
  providedIn: 'root',
})
export class BattleListService {
  constructor(public db: AngularFireDatabase) {}

  public getBattles(campaignId: Battle['campaignId']): Observable<Battle[]> {
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
}
