import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../services/theme.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {SteamSignInComponent} from '../steam-sign-in/steam-sign-in.component';
import {AngularFireAuth} from '@angular/fire/auth';
import {takeWhile, tap} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'opt-site-toolbar',
  templateUrl: './site-toolbar.component.html',
  styleUrls: ['./site-toolbar.component.scss'],
})
export class SiteToolbarComponent implements OnInit {
  public authDismissed = true;

  constructor(
    public themeService: ThemeService,
    public bottomSheet: MatBottomSheet,
    public fireAuth: AngularFireAuth
  ) {
  }

  ngOnInit(): void {
    this.fireAuth.authState.pipe(
      takeWhile(() => !this.authDismissed),
      tap((user) => {
        if (!user) {
          this.bottomSheet.open(SteamSignInComponent, {hasBackdrop: false});
        }
      }),
      untilDestroyed(this),
    ).subscribe();
  }
}
