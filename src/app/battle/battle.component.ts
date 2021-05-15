import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { pluck, switchMap } from 'rxjs/operators';
import { Battle } from '../campaign/campaign.component';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css'],
})
export class BattleComponent implements OnInit {
  public battle$: Observable<Battle | null>;
  public userId: string | undefined;

  constructor(
    public db: AngularFireDatabase,
    public auth: AngularFireAuth,
    public route: ActivatedRoute
  ) {
    auth.user.subscribe((user) => {
      this.userId = user?.uid;
    });

    const battleId$ = this.route.params.pipe(pluck('battleId'));
    this.battle$ = battleId$.pipe(
      switchMap((battleId) => {
        return this.db.object<Battle>(`battles/${battleId}`).valueChanges();
      })
    );
  }

  ngOnInit(): void {}
}
