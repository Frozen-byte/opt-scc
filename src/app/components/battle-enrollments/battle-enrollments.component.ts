import { Component, Input, OnInit } from '@angular/core';
import { Enrollment } from '../enroll-on-battle/enroll-on-battle.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EnrollmentsService } from '../../services/enrollments.service';
import { matExpansionAnimations } from '@angular/material/expansion';

@UntilDestroy()
@Component({
  selector: 'opt-battle-enrollments',
  templateUrl: './battle-enrollments.component.html',
  styleUrls: ['./battle-enrollments.component.scss'],
  animations: [matExpansionAnimations.indicatorRotate],
})
export class BattleEnrollmentsComponent implements OnInit {
  @Input() battleId = '';
  @Input() factionId = '';
  public counts: Record<Enrollment['status'], number> = {
    maybe: 0,
    no: 0,
    pending: 0,
    yes: 0,
  };
  public battleEnrollments: Enrollment[] = [];

  constructor(public enrollmentsService: EnrollmentsService) {}

  ngOnInit(): void {
    this.enrollmentsService
      .getEnrollments(this.battleId, this.factionId)
      .pipe(untilDestroyed(this))
      .subscribe((enrollments) => {
        enrollments?.forEach((enrollment) => {
          this.counts[enrollment.status] += 1;
        });
        this.battleEnrollments = enrollments;
      });
  }
}
