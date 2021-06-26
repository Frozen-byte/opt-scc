import { Component, OnInit } from '@angular/core';
import {
  OpenIdResponse,
  SteamAuthService,
} from '../../services/steam-auth.service';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { isDefinedGuard } from '../../toolbelt';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

function isOpenIdResponse(
  toBeDetermined: any
): toBeDetermined is OpenIdResponse {
  return toBeDetermined.hasOwnProperty('openid.sig');
}

@UntilDestroy()
@Component({
  selector: 'opt-steam-verify',
  templateUrl: './steam-verify.component.html',
  styleUrls: ['./steam-verify.component.css'],
})
export class SteamVerifyComponent implements OnInit {
  public status: 'idle' | 'verify' | 'error' | 'valid' = 'idle';

  constructor(
    steamAuth: SteamAuthService,
    route: ActivatedRoute,
    fireAuth: AngularFireAuth
  ) {
    route.queryParams
      .pipe(
        tap(() => (status = 'verify')),
        filter(isOpenIdResponse),
        switchMap(steamAuth.verify),
        filter(isDefinedGuard),
        switchMap((player) => {
          return fireAuth.signInWithCustomToken(player.jwt);
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  ngOnInit(): void {}
}
