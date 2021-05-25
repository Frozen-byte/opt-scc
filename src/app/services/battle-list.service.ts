import { EventEmitter, Injectable } from '@angular/core';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
} from 'rxjs/operators';
import { Battle } from '../battle/battle.types';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BattleListService {
  public battles$: Observable<Battle[]>;
  public currentBattle$: Observable<Battle>;
  private campaignId$: EventEmitter<Battle['campaignId']> = new EventEmitter();

  constructor(public db: AngularFireDatabase) {
    this.battles$ = this.campaignId$.pipe(
      distinctUntilChanged(),
      switchMap((campaignId) => {
        return db
          .list<Battle>('battles', (ref) =>
            ref.orderByChild('campaignId').equalTo(campaignId)
          )
          .valueChanges();
      }),
      map((battles) =>
        battles.sort((a, b) => {
          // ISO Date sorts Lexicographically https://stackoverflow.com/a/12192544
          return a.battleDate < b.battleDate
            ? -1
            : a.battleDate > b.battleDate
            ? 1
            : 0;
        })
      ),
      shareReplay(1)
    );

    this.currentBattle$ = this.battles$.pipe(
      map((battles) => {
        const today = new Date().toISOString();
        return battles.filter((battle) => {
          return battle.battleDate > today;
        })[0];
      }),
      shareReplay(1)
    );
  }

  public setCampaignId(campaignId: Battle['campaignId']): void {
    this.campaignId$.emit(campaignId);
  }

  getBattle(battleId: Battle['battleId']): Observable<Battle | null> {
    return this.db.object<Battle>(`battles/${battleId}`).valueChanges();
  }
}
