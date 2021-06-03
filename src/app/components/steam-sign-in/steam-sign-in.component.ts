import { Component, OnInit } from '@angular/core';
import { SteamAuthService } from '../../services/steam-auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'opt-steam-sign-in',
  templateUrl: './steam-sign-in.component.html',
  styleUrls: ['./steam-sign-in.component.scss'],
})
export class SteamSignInComponent implements OnInit {
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
