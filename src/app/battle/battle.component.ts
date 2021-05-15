import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { pluck, switchMap } from 'rxjs/operators';
import { Battle } from '../campaign/campaign.component';
import { Observable } from 'rxjs';
import { Enrollment } from '../enroll-on-battle/enroll-on-battle.component';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css'],
})
export class BattleComponent implements OnInit {
  public battleParticipation$: Observable<Enrollment[] | null>;
  public battle$: Observable<Battle | null>;
  public userId: string | undefined;

  constructor(
    db: AngularFireDatabase,
    route: ActivatedRoute,
    auth: AngularFireAuth
  ) {
    auth.user.subscribe((user) => {
      this.userId = user?.uid;
    });

    this.battle$ = route.params.pipe(
      pluck('battleId'),
      switchMap((battleId) => {
        return db.object<Battle>(`battles/${battleId}`).valueChanges();
      })
    );
    this.battleParticipation$ = route.params.pipe(
      pluck('battleId'),
      switchMap((battleId) => {
        return db
          .object<Enrollment[]>(`enrollments/${battleId}`)
          .valueChanges();
      })
    );
  }

  ngOnInit(): void {}
}
