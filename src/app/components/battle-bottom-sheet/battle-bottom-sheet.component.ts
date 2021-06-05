import { Component, Input, OnInit } from '@angular/core';
import { Enrollment } from '../enrollment-form/enrollment-form.component';
import { EnrollmentsService } from '../../services/enrollments.service';
import { Battle } from '../../route-outlets/battle/battle.types';
import { AngularFireAuth } from '@angular/fire/auth';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, switchMap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'opt-battle-bottom-sheet',
  templateUrl: './battle-bottom-sheet.component.html',
  styleUrls: ['./battle-bottom-sheet.component.scss'],
})
export class BattleBottomSheetComponent implements OnInit {
  @Input() battleId: Battle['battleId'] = '';
  public enrollment?: Enrollment;

  constructor(
    public fireAuth: AngularFireAuth,
    public enrollmentService: EnrollmentsService
  ) {}

  ngOnInit(): void {
    if (this.battleId) {
      this.fireAuth.user
        .pipe(
          filter((user) => !!user?.uid),
          map((user) => user?.uid as string),
          switchMap((userId) =>
            this.enrollmentService.getEnrollment(this.battleId, userId)
          ),
          map((enrollment) => enrollment as Enrollment),
          untilDestroyed(this)
        )
        .subscribe((enrollment) => {
          this.enrollment = enrollment;
        });
    }
  }

  enrollmentChange(enrollment: Enrollment): void {
    this.enrollmentService.patchEnrollment(this.battleId, enrollment);
  }
}
