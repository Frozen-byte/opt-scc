import { Component, Inject, OnInit } from '@angular/core';
import { Enrollment } from '../enroll-on-battle/enroll-on-battle.component';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
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
  enrollment?: Enrollment;
  battleId: Battle['battleId'];

  constructor(
    public fireAuth: AngularFireAuth,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public bottomSheetData: {
      battleId: Battle['battleId'];
    },
    public enrollmentService: EnrollmentsService
  ) {
    this.battleId = bottomSheetData.battleId;
    this.fireAuth.user
      .pipe(
        filter((user) => !!user?.uid),
        map((user) => user?.uid as string),
        switchMap((userId) =>
          this.enrollmentService.getEnrollment(this.battleId, userId)
        ),
        untilDestroyed(this)
      )
      .subscribe((enrollment) => {
        if (enrollment) {
          this.enrollment = enrollment;
        }
      });
  }

  ngOnInit(): void {}

  enrollmentChange(enrollment: Enrollment): void {
    this.enrollmentService.patchEnrollment(this.battleId, enrollment);
  }
}
