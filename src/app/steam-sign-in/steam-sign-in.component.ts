import { Component, OnInit } from '@angular/core';
import {
  STEAM_AUTHENTICATE_URL,
  SteamAuthService,
} from '../steam-auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-steam-sign-in',
  templateUrl: './steam-sign-in.component.html',
  styleUrls: ['./steam-sign-in.component.css'],
})
export class SteamSignInComponent implements OnInit {
  STEAM_AUTHENTICATE_URL = STEAM_AUTHENTICATE_URL;

  constructor(
    public steamAuth: SteamAuthService,
    public fireAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.steamAuth.authenticate();
  }

  logout(): void {
    this.fireAuth.signOut();
  }
}
