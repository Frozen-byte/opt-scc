import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

export type CampaignId = string;
export interface Campaign {
  campaignId: CampaignId;
  campaignName: string;
}

@Component({
  selector: 'opt-player-overview',
  templateUrl: './player-overview.component.html',
  styleUrls: ['./player-overview.component.scss'],
})
export class PlayerOverviewComponent implements OnInit {
  public campaignId$: Observable<CampaignId> = this.route.params.pipe(
    pluck('campaignId'),
    distinctUntilChanged()
  );

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
