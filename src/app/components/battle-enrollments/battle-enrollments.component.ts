import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Enrollment } from '../enroll-on-battle/enroll-on-battle.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EnrollmentsService } from '../../services/enrollments.service';
import { matExpansionAnimations } from '@angular/material/expansion';
import { BehaviorSubject } from 'rxjs';

const EMPTY_COUNTS = () => ({
  maybe: 0,
  no: 0,
  pending: 0,
  yes: 0,
});

@UntilDestroy()
@Component({
  selector: 'opt-battle-enrollments',
  templateUrl: './battle-enrollments.component.html',
  styleUrls: ['./battle-enrollments.component.scss'],
  animations: [matExpansionAnimations.indicatorRotate],
})
export class BattleEnrollmentsComponent implements OnInit, OnDestroy {
  public status = new BehaviorSubject<'loading' | 'ready' | 'empty'>('loading');
  @Input() battleId = '';
  @Input() factionId = '';
  public counts: Record<Enrollment['status'], number> = EMPTY_COUNTS();
  public battleEnrollments: Enrollment[] = [];

  constructor(public enrollmentsService: EnrollmentsService) {}

  ngOnInit(): void {
    this.enrollmentsService
      .getEnrollments(this.battleId, this.factionId)
      .pipe(untilDestroyed(this))
      .subscribe((enrollments) => {
        this.counts = EMPTY_COUNTS();
        enrollments?.forEach((enrollment) => {
          this.counts[enrollment.status] += 1;
        });
        this.battleEnrollments = enrollments;
        if (this.battleEnrollments?.length > 0) {
          this.status.next('ready');
        } else {
          this.status.next('empty');
        }
      });
  }

  ngOnDestroy(): void {
    this.status.complete();
  }
}
