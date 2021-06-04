import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export interface Enrollment {
  battleId: string;
  factionId: string;
  status: 'yes' | 'no' | 'maybe' | 'pending';
  comment: string;
  userId: string;
  displayName: string;
  photoUrl: string;
}

@Component({
  selector: 'opt-enroll-on-battle',
  templateUrl: './enroll-on-battle.component.html',
  styleUrls: ['./enroll-on-battle.component.css'],
})
export class EnrollOnBattleComponent implements OnInit, OnChanges {
  public enrollmentForm = new FormGroup({
    battleId: new FormControl(),
    factionId: new FormControl(),
    status: new FormControl(),
    comment: new FormControl(undefined, { updateOn: 'blur' }),
    userId: new FormControl(),
    displayName: new FormControl(),
    photoUrl: new FormControl(),
  });
  @Input() enrollment?: Enrollment;
  @Output() enrollmentChange = this.enrollmentForm.valueChanges;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.enrollmentForm.patchValue(changes.enrollment?.currentValue);
  }
}
