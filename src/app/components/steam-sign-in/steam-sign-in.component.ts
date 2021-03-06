import { Component, OnInit } from '@angular/core';
import { STEAM_AUTHENTICATE_URL } from '../../services/steam-auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'opt-steam-sign-in',
  templateUrl: './steam-sign-in.component.html',
  styleUrls: ['./steam-sign-in.component.scss'],
})
export class SteamSignInComponent implements OnInit {
  STEAM_AUTHENTICATE_URL = STEAM_AUTHENTICATE_URL;

  constructor(public fireAuth: AngularFireAuth) {}

  ngOnInit(): void {}

  emulatedAuth(event: any): false | void {
    if (environment.useEmulators) {
      event.preventDefault();

      import('firebase/app').then((firebase) => {
        this.fireAuth.signInWithPopup(
          new firebase.default.auth.GoogleAuthProvider()
        );
      });

      return false;
    }
  }
}
