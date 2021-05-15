import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from '../enroll-on-battle/enroll-on-battle.component';
import { map } from 'rxjs/operators';
import { merge } from 'lodash';
import { AngularFireDatabase } from '@angular/fire/database';

export interface FactionEnrollmentCount {
  [key: string]: { [key: string]: number };
}

@Component({
  selector: 'app-battle-enrollments',
  templateUrl: './battle-enrollments.component.html',
  styleUrls: ['./battle-enrollments.component.css'],
})
export class BattleEnrollmentsComponent implements OnInit {
  @Input() battleId: string | undefined;

  public battleEnrollment$?: Observable<Enrollment[] | null>;
  public battleEnrollmentCounts$?: Observable<
    FactionEnrollmentCount | undefined
  >;

  constructor(public db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.battleEnrollment$ = this.db
      .list<Enrollment>(`enrollments/${this.battleId}`)
      .valueChanges();

    this.battleEnrollmentCounts$ = this.battleEnrollment$.pipe(
      map((enrollments) => {
        return enrollments?.reduce((previousValue, currentValue) => {
          const count =
            previousValue?.[currentValue.faction]?.[currentValue.status] ?? 0;
          return merge(previousValue, {
            [currentValue.faction]: {
              [currentValue.status]: count + 1,
            },
          });
        }, {} as FactionEnrollmentCount);
      })
    );
  }
}
