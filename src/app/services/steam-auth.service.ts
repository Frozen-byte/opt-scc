import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';

export type Timestamp = number;
export type Hyperlink = string;

/**
 * see https://developer.valvesoftware.com/wiki/Steam_Web_API#GetPlayerSummaries_.28v0002.29
 */
export interface SteamGetPlayerSummaries {
  avatar: Hyperlink;
  avatarfull: Hyperlink;
  avatarhash: string;
  avatarmedium: Hyperlink;
  commentpermission: 1 | 0;
  communityvisibilitystate: 1 | 3;
  lastlogoff: Timestamp;
  personaname: string;
  personastate: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  personastateflags: number;
  primaryclanid: string;
  profilestate: 1 | 0;
  profileurl: Hyperlink;
  steamid: string;
  timecreated: Timestamp;
}

export interface OpenIdResponse extends Record<string, string> {
  'openid.assoc_handle': string;
  'openid.claimed_id': string;
  'openid.identity': string;
  'openid.mode': string;
  'openid.ns': string;
  'openid.op_endpoint': string;
  'openid.response_nonce': string;
  'openid.return_to': string;
  'openid.sig': string;
  'openid.signed': string;
}

// TODO: move to firebase
export const STEAM_AUTHENTICATE_URL = 'https://steam.byte.pm/api/steam/auth';
export const STEAM_VERIFY_URL = 'https://steam.byte.pm/api/steam/verify';

@Injectable({
  providedIn: 'root',
})
export class SteamAuthService {
  constructor() {}

  authenticate(): Promise<void> {
    return fetch(STEAM_AUTHENTICATE_URL)
      .then((response) => response.text())
      .then((redirectUrl) => {
        if (redirectUrl) {
          window.open(redirectUrl);
        }
      });
  }

  /*
   * Returns GetPlayerSummaries on success, null if auth failed
   */
  verify(
    openIdParams: OpenIdResponse
  ): Observable<{ jwt: string; steamid: string } | null> {
    const urlParams = new URLSearchParams(openIdParams).toString();
    return ajax({
      url: STEAM_VERIFY_URL + '?' + urlParams,
      crossDomain: true,
    }).pipe(map((res) => res.response));
  }
}
