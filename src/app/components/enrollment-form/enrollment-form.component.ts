import {
  Component,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Battle } from '../../route-outlets/battle/battle.types';
import { Faction } from '../../route-outlets/campaign/campaign.component';

export interface Enrollment {
  battleId: Battle['battleId'];
  userId: string;
  displayName: string;
  photoUrl: string;
  status: 'yes' | 'no' | 'maybe' | 'pending';
  factionId?: Faction['factionId'];
  comment?: string;
}

@Component({
  selector: 'opt-enrollment-form',
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.scss'],
})
export class EnrollmentFormComponent implements OnChanges {
  public enrollmentForm = new FormGroup({
    battleId: new FormControl(),
    factionId: new FormControl(),
    status: new FormControl(),
    comment: new FormControl('', { updateOn: 'blur' }),
    userId: new FormControl(),
    displayName: new FormControl(),
    photoUrl: new FormControl(),
  });
  @Input() enrollment?: Enrollment;
  @Output() enrollmentChange = this.enrollmentForm.valueChanges;

  ngOnChanges(changes: SimpleChanges): void {
    this.enrollmentForm.patchValue(changes.enrollment?.currentValue);
  }
}
