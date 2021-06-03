import { Component, Input, OnInit, Output } from '@angular/core';
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
export class EnrollOnBattleComponent implements OnInit {
  public enrollmentForm = new FormGroup({
    factionId: new FormControl(),
    status: new FormControl(),
    comment: new FormControl(undefined, { updateOn: 'blur' }),
  });
  @Input() enrollment?: Enrollment;
  @Output() enrollmentChange = this.enrollmentForm.valueChanges;

  constructor() {}

  ngOnInit(): void {}
}
