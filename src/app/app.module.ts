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
  ],
  providers: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
