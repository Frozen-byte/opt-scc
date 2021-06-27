import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignComponent } from './campaign/campaign.component';
import { BattleComponent } from './battle/battle.component';
import { SteamVerifyComponent } from '../components/steam-verify/steam-verify.component';
import { PlayerListComponent } from './player-list/player-list.component';

const routes: Routes = [
  { path: 'players/:campaignId', component: PlayerListComponent },
  { path: 'steam-verify', component: SteamVerifyComponent },
  { path: 'campaign/:campaignId', component: CampaignComponent },
  { path: 'battle/:battleId', component: BattleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class OptRoutingModule {}
