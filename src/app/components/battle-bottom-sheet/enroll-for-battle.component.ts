import { Component, Input, OnInit } from '@angular/core';
import { Enrollment } from '../enrollment-form/enrollment-form.component';
import { EnrollmentsService } from '../../services/enrollments.service';
import { Battle } from '../../route-outlets/battle/battle.types';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { SteamAuthService } from '../../services/steam-auth.service';
import { throwError } from 'rxjs';
import { isDefinedGuard } from '../../toolbelt';
import { PlayerService } from '../../services/player.service';

@UntilDestroy()
@Component({
  selector: 'opt-enroll-for-battle[battle]',
  templateUrl: './enroll-for-battle.component.html',
  styleUrls: ['./enroll-for-battle.component.scss'],
})
export class EnrollForBattleComponent implements OnInit {
  @Input() battle!: Battle; // ensured by component selector definition: `opt-enroll-for-battle[battle]`
  // private battle$ = new EventEmitter<Battle | null>();
  public enrollment?: Enrollment;

  constructor(
    public authService: SteamAuthService,
    public playerService: PlayerService,
    public enrollmentService: EnrollmentsService
  ) {
    this.authService.loggedInUserId
      .pipe(
        filter(isDefinedGuard),
        switchMap((userId) => {
          if (isDefinedGuard(userId) && isDefinedGuard(this.battle.battleId)) {
            return this.enrollmentService.getEnrollment(
              this.battle.battleId,
              userId
            );
          }
          return throwError('The Guard for userId or battle failed');
        }),
        withLatestFrom(
          this.authService.loggedInUser.pipe(filter(isDefinedGuard))
        ),
        untilDestroyed(this)
      )
      .subscribe(([enrollment, user]) => {
        // enrollment may not defined, yet. fill all pre required data
        this.enrollment = (enrollment as Enrollment) ?? {
          battleId: this.battle.battleId,
          userId: user.uid,
          displayName: user.displayName || user.uid,
          photoUrl: user.photoURL,
          status: 'pending',
        };

        // create player
        // TODO: skip if existing
        this.playerService.patchPlayer(this.battle.campaignId, {
          fireAuthUid: user.uid,
          displayName: user.displayName ?? user.uid,
          photoUrl: user.photoURL ?? undefined,
        });
      });
  }

  ngOnInit(): void {}

  enrollmentChange(enrollment: Enrollment): void {
    this.enrollmentService.patchEnrollment(enrollment);
  }
}
