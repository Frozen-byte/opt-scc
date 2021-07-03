import { Component, Input, OnInit } from '@angular/core';
import { Battle } from '../battle/battle.types';
import { BattleListService } from '../../services/battle-list.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

export type DATE_ISO8601 = string;

export type FactionId = 'bootcamp' | 'retired' | 'arf' | 'sword' | 'unknown';
export type SideId = 'csat' | 'nato' | 'aaf';

export interface Faction {
  factionName: string;
  factionId: FactionId;
  factionSide: SideId;
}

@Component({
  selector: 'opt-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss'],
})
export class CampaignComponent implements OnInit {
  public campaignName = 'Aufstand des Lumpenproletatiats';
  public battles$: Observable<Battle[]>;

  @Input() campaignId: Battle['campaignId'];

  constructor(
    public battleListService: BattleListService,
    route: ActivatedRoute
  ) {
    this.campaignId = route.snapshot.paramMap.get('campaignId') ?? '';

    this.battles$ = battleListService.getBattles(this.campaignId);
  }

  ngOnInit(): void {}
}
