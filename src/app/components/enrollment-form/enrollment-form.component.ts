import {
  Component,
  Input,
  OnChanges,
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
