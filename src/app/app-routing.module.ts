import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignComponent } from './campaign/campaign.component';
import { BattleComponent } from './battle/battle.component';
import { SteamVerifyComponent } from './steam-verify/steam-verify.component';

const routes: Routes = [
  { path: 'players', component: SteamVerifyComponent },
  { path: 'steam-verify', component: SteamVerifyComponent },
  { path: 'campaign/:campaignId', component: CampaignComponent },
  { path: 'battle/:battleId', component: BattleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
