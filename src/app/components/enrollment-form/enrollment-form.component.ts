import {
  Component,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BattleId } from '../../route-outlets/battle/battle.types';
import { FactionId } from '../../route-outlets/campaign/campaign.component';
import { Hyperlink } from '../../toolbelt';

export interface Enrollment {
  battleId: BattleId;
  userId: string;
  displayName: string;
  photoUrl: Hyperlink;
  status: 'yes' | 'no' | 'maybe' | 'pending';
  factionId?: FactionId;
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
