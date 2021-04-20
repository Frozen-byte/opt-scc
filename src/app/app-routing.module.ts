import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CampaignComponent} from './campaign/campaign.component';
import {BattleComponent} from './battle/battle.component';

const routes: Routes = [
  {path: 'campaign/:campaignId', component: CampaignComponent},
  {path: 'battle/:battleId', component: BattleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
