import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CampaignComponent} from './campaign/campaign.component';
import {BattleComponent} from './battle/battle.component';
import {EnrollOnBattleComponent} from './enroll-on-battle/enroll-on-battle.component';
import {SteamVerifyComponent} from './steam-verify/steam-verify.component';

const routes: Routes = [
  {path: 'steam-verify', component: SteamVerifyComponent},
  {path: 'campaign/:campaignId', component: CampaignComponent},
  {path: 'battle/:battleId', component: BattleComponent, children: [
      {path: 'enroll', component: EnrollOnBattleComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
