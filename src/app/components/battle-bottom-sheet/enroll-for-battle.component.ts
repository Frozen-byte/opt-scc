import { Component, Input, OnInit } from '@angular/core';
import { Enrollment } from '../enrollment-form/enrollment-form.component';
import { EnrollmentsService } from '../../services/enrollments.service';
import { Battle } from '../../route-outlets/battle/battle.types';
import { AngularFireAuth } from '@angular/fire/auth';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'opt-enroll-for-battle[battle]',
  templateUrl: './enroll-for-battle.component.html',
  styleUrls: ['./enroll-for-battle.component.scss'],
})
export class EnrollForBattleComponent implements OnInit {
  @Input() battle: Battle;
  public enrollment?: Enrollment;

  constructor(
    public fireAuth: AngularFireAuth,
    public enrollmentService: EnrollmentsService
  ) {}

  ngOnInit(): void {
    if (this.battle) {
      this.fireAuth.user
        .pipe(
          filter((user) => !!user?.uid),
          map((user) => user?.uid as string),
          switchMap((userId) =>
            this.enrollmentService.getEnrollment(this.battle?.battleId, userId)
          ),
          map((enrollment) => enrollment as Enrollment),
          withLatestFrom(this.fireAuth.user),
          untilDestroyed(this)
        )
        .subscribe(([enrollment, user]) => {
          console.debug(enrollment, user);
          // enrollment may not defined, yet. fill all pre required data
          this.enrollment = enrollment ?? {
            battleId: this.battle?.battleId,
            userId: user?.uid,
            photoUrl: user?.photoURL,
          };
        });
    }
  }

  enrollmentChange(enrollment: Enrollment): void {
    this.enrollmentService.patchEnrollment(this.battle.battleId, enrollment);
  }
}
