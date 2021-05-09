import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map, pluck, switchMap} from 'rxjs/operators';

export interface Faction {
  factionName: string;
  factionId: string;
  factionSide: string;
  factionAttackingSectors: number[];
  factionAttackedSectors: number[];
}

export interface Battle {
  battleName: string;
  battleId: string;
  campaignName: string;
  campaignId: string;
  battleDate: Date;
  duration: number;
  weather: string;
  factions: Faction[];
}

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
  public campaignName = 'Aufstand des Lumpenproletatiats';

  public battles$: Observable<Battle[]>;

  constructor(db: AngularFireDatabase, route: ActivatedRoute) {
    this.battles$ = route.params.pipe(
      pluck('campaignId'),
      switchMap((campaignId) => {
        return db.list<Battle>(
          'battles',
            ref => ref.orderByChild('campaignId').equalTo(campaignId)
        ).valueChanges();
      }),
      map((battles) => battles.sort((a, b) => {
        // ISO Date sorts Lexicographically https://stackoverflow.com/a/12192544
        return (a.battleDate < b.battleDate) ? -1 : ((a.battleDate > b.battleDate) ? 1 : 0);
      })),
    );
  }

  ngOnInit(): void {
  }

}
