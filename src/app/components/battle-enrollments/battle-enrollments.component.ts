import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Enrollment } from '../enroll-on-battle/enroll-on-battle.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CdkAccordionItem } from '@angular/cdk/accordion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import {
  matExpansionAnimations,
  MatExpansionPanelState,
} from '@angular/material/expansion';
import { EnrollmentsService } from '../../services/enrollments.service';

@UntilDestroy()
@Component({
  selector: 'opt-battle-enrollments',
  templateUrl: './battle-enrollments.component.html',
  styleUrls: ['./battle-enrollments.component.scss'],
  animations: [
    matExpansionAnimations.bodyExpansion,
    matExpansionAnimations.indicatorRotate,
  ],
})
export class BattleEnrollmentsComponent
  extends CdkAccordionItem
  implements OnInit
{
  @Input() battleId = '';
  @Input() factionId = '';
  public counts: Record<Enrollment['status'], number> = {
    maybe: 0,
    no: 0,
    pending: 0,
    yes: 0,
  };
  public battleEnrollments: Enrollment[] = [];

  constructor(
    _changeDetectorRef: ChangeDetectorRef,
    _expansionDispatcher: UniqueSelectionDispatcher,
    public enrollmentsService: EnrollmentsService
  ) {
    super(
      // @ts-ignore
      null,
      _changeDetectorRef,
      _expansionDispatcher
    );
  }

  getExpandedState(): MatExpansionPanelState {
    return this.expanded ? 'expanded' : 'collapsed';
  }

  ngOnInit(): void {
    this.open();

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
