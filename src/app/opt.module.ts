import { NgModule } from '@angular/core';
import { OptComponent } from './opt.component';
import { CampaignComponent } from './route-outlets/campaign/campaign.component';
import { BattleComponent } from './route-outlets/battle/battle.component';
import { DurationPipe } from './pipes/duration.pipe';
import { EnrollmentFormComponent } from './components/enrollment-form/enrollment-form.component';
import { SteamSignInComponent } from './components/steam-sign-in/steam-sign-in.component';
import { SteamVerifyComponent } from './components/steam-verify/steam-verify.component';
import { BattleEnrollmentsComponent } from './components/battle-enrollments/battle-enrollments.component';
import { SectorSelectComponent } from './components/sector-select/sector-select.component';
import { PlayerListComponent } from './route-outlets/player-list/player-list.component';
import { BattleSectorSelectDialogComponent } from './components/battle-sector-select-dialog/battle-sector-select-dialog.component';
import { FactionScoreComponent } from './components/faction-score/faction-score.component';
import { BattleLinkComponent } from './components/battle-link/battle-link.component';
import { SiteToolbarComponent } from './components/site-toolbar/site-toolbar.component';
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
import { MatCardModule } from '@angular/material-experimental/mdc-card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatBadgeModule } from '@angular/material/badge';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatExpansionModule } from '@angular/material/expansion';
import { BattleBottomSheetComponent } from './components/battle-bottom-sheet/battle-bottom-sheet.component';
import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/auth';
import { USE_EMULATOR as USE_DATABASE_EMULATOR } from '@angular/fire/database';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material-experimental/mdc-form-field';
import { MatInputModule } from '@angular/material-experimental/mdc-input';

@NgModule({
  declarations: [
    OptComponent,
    CampaignComponent,
    BattleComponent,
    DurationPipe,
    EnrollmentFormComponent,
    SteamSignInComponent,
    SteamVerifyComponent,
    BattleEnrollmentsComponent,
    SectorSelectComponent,
    PlayerListComponent,
    BattleSectorSelectDialogComponent,
    FactionScoreComponent,
    BattleLinkComponent,
    SiteToolbarComponent,
    BattleBottomSheetComponent,
  ],
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
    MatBottomSheetModule,
    MatBadgeModule,
    CdkAccordionModule,
    MatExpansionModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    {
      provide: USE_AUTH_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', 9099] : undefined,
    },
    {
      provide: USE_DATABASE_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', 9000] : undefined,
    },
  ],
  bootstrap: [OptComponent],
})
export class OptModule {}
