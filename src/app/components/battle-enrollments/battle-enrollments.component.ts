import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Enrollment} from '../enroll-on-battle/enroll-on-battle.component';
import {map} from 'rxjs/operators';
import {merge} from 'lodash';
import {EnrollmentsService} from '../../services/enrollments.service';

type FactionEnrollmentCount = Record<string, Record<Enrollment['status'], number>>;

@Component({
  selector: 'opt-battle-enrollments',
  templateUrl: './battle-enrollments.component.html',
  styleUrls: ['./battle-enrollments.component.scss'],
})
export class BattleEnrollmentsComponent implements OnInit {
  @Input() battleId = '';

  public factionIdColumn: { [key: string]: number } = {
    arf: 1,
    sword: 2

  };

  public battleEnrollment$?: Observable<Enrollment[] | null>;
  public battleEnrollmentCounts$?: Observable<FactionEnrollmentCount | undefined>;

  constructor(
    public enrollments: EnrollmentsService
  ) {
  }

  ngOnInit(): void {
    this.battleEnrollment$ = this.enrollments.getEnrollments(this.battleId);

    this.battleEnrollmentCounts$ = this.battleEnrollment$.pipe(
      map((enrollments) => {
        return enrollments?.reduce((previousValue, currentValue) => {
          const count =
            previousValue?.[currentValue.factionId]?.[currentValue.status] ?? 0;
          return merge(previousValue, {
            [currentValue.factionId]: {
              [currentValue.status]: count + 1,
            },
          });
        }, {} as FactionEnrollmentCount);
      }),
    );
  }
}
