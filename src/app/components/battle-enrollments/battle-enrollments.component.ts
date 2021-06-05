import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  TrackByFunction,
} from '@angular/core';
import { Enrollment } from '../enrollment-form/enrollment-form.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EnrollmentsService } from '../../services/enrollments.service';
import { matExpansionAnimations } from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

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
  constructor(public enrollmentsService: EnrollmentsService) {}
  @Input() battleId = '';
  @Input() factionId = '';
  public counts: Record<Enrollment['status'], number> = EMPTY_COUNTS();
  public battleEnrollments$?: Observable<Enrollment[]>;

  public enrollmentStatusIconMap: Record<Enrollment['status'], string> = {
    pending: 'radio_button_unchecked',
    yes: 'check_circle_outline',
    no: 'highlight_off',
    maybe: 'help_outline',
  };

  public enrollmentTrackBy: TrackByFunction<Enrollment> = (
    index,
    enrollment
  ) => {
    return `${enrollment.status}${enrollment.factionId}${enrollment.comment}${enrollment.userId}`;
  };

  ngOnInit(): void {
    this.battleEnrollments$ = this.enrollmentsService
      .getEnrollments(this.battleId, this.factionId)
      .pipe(
        tap((enrollments) => {
          this.counts = EMPTY_COUNTS();
          enrollments?.forEach((enrollment) => {
            this.counts[enrollment.status] += 1;
          });
        }),
        debounceTime(25),
        untilDestroyed(this)
      );
  }

  ngOnDestroy(): void {}
}
