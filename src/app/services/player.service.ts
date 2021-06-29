import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  QueryFn,
} from '@angular/fire/database';
import { Player, SteamAuthService } from './steam-auth.service';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { isDefinedGuard } from '../toolbelt';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(
    private authService: SteamAuthService,
    private db: AngularFireDatabase
  ) {}

  getPlayerList(
    campaignId: string,
    queryFn?: QueryFn
  ): AngularFireList<Player> {
    return this.db.list<Player>(`players/${campaignId}`, queryFn);
  }

  getPlayer(campaignId: string, playerId: string): Observable<Player | null> {
    return this.db
      .object<Player>(`/players/${campaignId}/${playerId}`)
      .valueChanges();
  }

  /*
    the player is basically the user with additional campaign information like faction and rank
   */
  getLoggedInPlayer(campaignId: string): Observable<Player | null> {
    return this.authService.loggedInUserId.pipe(
      filter(isDefinedGuard),
      switchMap((userId) => this.getPlayer(campaignId, userId))
    );
  }

  patchPlayer(
    campaignId: string,
    player: Partial<Player> &
      Required<{
        fireAuthUid: Player['fireAuthUid'];
      }>
  ): Promise<void> {
    return this.db
      .object(`players/${campaignId}/${player.fireAuthUid}`)
      .update(player);
  }
}
