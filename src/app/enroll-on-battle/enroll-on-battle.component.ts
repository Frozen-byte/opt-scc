import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { isEqual } from 'lodash';

export interface Enrollment {
  battleId: string;
  userId: string;
  faction: string;
  status: 'yes' | 'no' | 'maybe' | 'pending';
  comment: string;
}

@Component({
  selector: 'opt-enroll-on-battle',
  templateUrl: './enroll-on-battle.component.html',
  styleUrls: ['./enroll-on-battle.component.css'],
})
export class EnrollOnBattleComponent implements OnInit {
  @Input() battleId: string | undefined;
  @Input() userId: string | undefined;

  public enrollmentForm = new FormGroup({
    faction: new FormControl(),
    status: new FormControl(),
    comment: new FormControl(undefined, { updateOn: 'blur' }),
  });

  constructor(public db: AngularFireDatabase, public route: ActivatedRoute) {}

  ngOnInit(): void {
    const enrollmentDatabase = this.db.object<Enrollment>(
      `enrollments/${this.battleId}/${this.userId}`
    );
    enrollmentDatabase.valueChanges().subscribe((nextDbValues) => {
      if (nextDbValues) {
        this.enrollmentForm.patchValue(nextDbValues, {});
      }
    });

    this.enrollmentForm.valueChanges
      .pipe(
        distinctUntilChanged((prevValue, nextValue) =>
          isEqual(prevValue, nextValue)
        ),
        switchMap((nextValue) => {
          // TODO: improve performance, patchValue from above will trigger this, again
          return this.db
            .object<Enrollment>(`enrollments/${this.battleId}/${this.userId}`)
            .update({ ...nextValue, userId: this.userId });
        })
      )
      .subscribe();
  }
}
