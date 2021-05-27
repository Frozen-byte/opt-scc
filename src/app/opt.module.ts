import { NgModule } from '@angular/core';
import { OptComponent } from './opt.component';
import { CampaignComponent } from './route-outlets/campaign/campaign.component';
import { BattleComponent } from './route-outlets/battle/battle.component';
import { DurationPipe } from './duration.pipe';
import { EnrollOnBattleComponent } from './components/enroll-on-battle/enroll-on-battle.component';
import { SteamSignInComponent } from './components/steam-sign-in/steam-sign-in.component';
import { SteamVerifyComponent } from './components/steam-verify/steam-verify.component';
import { BattleEnrollmentsComponent } from './components/battle-enrollments/battle-enrollments.component';
import { SectorSelectComponent } from './components/sector-select/sector-select.component';
import { PlayerListComponent } from './route-outlets/player-list/player-list.component';
import { BattleSectorSelectDialogComponent } from './components/battle-sector-select-dialog/battle-sector-select-dialog.component';
import { FactionScoreComponent } from './components/faction-score/faction-score.component';
import { BrowserModule } from '@angular/platform-browser';
import { OptRoutingModule } from './opt-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BattleLinkComponent } from './components/battle-link/battle-link.component';
import { SiteToolbarComponent } from './components/site-toolbar/site-toolbar.component';

@NgModule({
  imports: [
    // Native Modules
    BrowserModule,
    OptRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // 3rd Party Modules
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    // Material Modules
    MatTooltipModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatRippleModule,
    MatDialogModule,
    MatSlideToggleModule,
  ],
  declarations: [
    OptComponent,
    CampaignComponent,
    BattleComponent,
    DurationPipe,
    EnrollOnBattleComponent,
    SteamSignInComponent,
    SteamVerifyComponent,
    BattleEnrollmentsComponent,
    SectorSelectComponent,
    PlayerListComponent,
    BattleSectorSelectDialogComponent,
    FactionScoreComponent,
    BattleLinkComponent,
    SiteToolbarComponent,
  ],
  providers: [],
  bootstrap: [OptComponent],
})
export class OptModule {}
