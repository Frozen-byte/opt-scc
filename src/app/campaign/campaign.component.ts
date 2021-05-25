import { Component, Input, OnInit } from '@angular/core';
import { Battle } from '../battle/battle.types';
import { BattleListService } from '../services/battle-list.service';
import { ActivatedRoute } from '@angular/router';

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

  public battles: Battle[] = [];
  public currentBattle?: Battle;

  @Input() campaignId: Battle['campaignId'];

  constructor(
    public battleListService: BattleListService,
    route: ActivatedRoute
  ) {
    this.campaignId = route.snapshot.paramMap.get('campaignId') ?? '';

    battleListService.battles$.subscribe((b) => (this.battles = b));
    battleListService.currentBattle$.subscribe(
      (cb) => (this.currentBattle = cb)
    );
  }

  ngOnInit(): void {
    this.battleListService.setCampaignId(this.campaignId);
  }

  isActive(battle: Battle): boolean {
    return battle.battleId === this.currentBattle?.battleId;
  }
}
