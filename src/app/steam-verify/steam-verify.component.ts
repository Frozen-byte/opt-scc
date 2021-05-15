import {Component, OnInit} from '@angular/core';
import {OpenIdResponse, SteamAuthService} from '../steam-auth.service';
import {ActivatedRoute} from '@angular/router';
import {filter, switchMap, tap} from 'rxjs/operators';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {EmptyError} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';

function isOpenIdResponse(toBeDetermined: any): toBeDetermined is OpenIdResponse {
  return toBeDetermined.hasOwnProperty('openid.sig');
}

@Component({
  selector: 'app-steam-verify',
  templateUrl: './steam-verify.component.html',
  styleUrls: ['./steam-verify.component.css']
})
export class SteamVerifyComponent implements OnInit {

  public status: 'idle' | 'verify' | 'error' | 'valid' = 'idle';

  constructor(steamAuth: SteamAuthService, route: ActivatedRoute, fireAuth: AngularFireAuth) {
    route.queryParams.pipe(
      tap(() => status = 'verify'),
      filter(isOpenIdResponse),
      switchMap(steamAuth.verify),
      filter(isNotNullOrUndefined),
      switchMap(player => {
        if (player) { // typescript helper, the filter() method above should be sufficient but TS does not parse it
          return fireAuth.signInWithCustomToken(player.jwt);
        }
        // potentially dead code return
        return EmptyError;
      })
    ).subscribe();
  }

  ngOnInit(): void {
  }

}
