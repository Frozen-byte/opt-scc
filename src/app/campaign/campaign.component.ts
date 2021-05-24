import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, pluck, switchMap } from 'rxjs/operators';
import { Battle } from '../battle/battle.interface';

export type DATE_ISO8601 = string;

export interface Faction {
  factionName: string;
  factionId: string;
  factionSide: string;
}

@Component({
  selector: 'opt-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss'],
})
export class CampaignComponent implements OnInit {
  public campaignName = 'Aufstand des Lumpenproletatiats';

  public battles$: Observable<Battle[]>;
  public currentBattle?: Battle;

  constructor(db: AngularFireDatabase, route: ActivatedRoute) {
    this.battles$ = route.params.pipe(
      pluck('campaignId'),
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
      )
    );

    this.battles$
      .pipe(
        map((battles) => {
          const today = new Date().toISOString();
          return battles.filter((battle) => {
            return battle.battleDate > today;
          })[0];
        })
      )
      .subscribe((currentBattle) => (this.currentBattle = currentBattle));
  }

  ngOnInit(): void {}

  isActive(battle: Battle): boolean {
    return battle.battleId === this.currentBattle?.battleId;
  }
}
