import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampaignComponent } from './campaign/campaign.component';
import { BattleComponent } from './battle/battle.component';
import { DurationPipe } from './duration.pipe';
import { EnrollOnBattleComponent } from './enroll-on-battle/enroll-on-battle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SteamSignInComponent } from './steam-sign-in/steam-sign-in.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { SteamVerifyComponent } from './steam-verify/steam-verify.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BattleEnrollmentsComponent } from './battle-enrollments/battle-enrollments.component';
import { SectorSelectComponent } from './sector-select/sector-select.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { PlayerListComponent } from './player-list/player-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    CampaignComponent,
    BattleComponent,
    DurationPipe,
    EnrollOnBattleComponent,
    SteamSignInComponent,
    SteamVerifyComponent,
    BattleEnrollmentsComponent,
    SectorSelectComponent,
    PlayerListComponent,
  ],
  providers: [],
  imports: [
    // Native Modules
    BrowserModule,
    AppRoutingModule,
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
    MatGridListModu,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
