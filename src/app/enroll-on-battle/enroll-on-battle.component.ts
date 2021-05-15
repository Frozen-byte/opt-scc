import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

export interface Enrollment {
  battleId: string;
  steamID64: string;
  faction: string;
  status: 'yes' | 'no' | 'maybe' | 'pending';
  comment: string;
}

@Component({
  selector: 'app-enroll-on-battle',
  templateUrl: './enroll-on-battle.component.html',
  styleUrls: ['./enroll-on-battle.component.css']
})
export class EnrollOnBattleComponent implements OnInit {
  public enrollment: Enrollment = {
    battleId: 'adl-schlacht-1',
    steamID64: '56875189413685',
    faction: 'SWORD',
    status: 'yes',
    comment: 'WRYYYYYYYYYYYYYYYYYYYY'
  };

  public enrollmentForm = new FormGroup({
    status: new FormControl(this.enrollment.status),
    comment: new FormControl(this.enrollment.comment),
  });

  constructor() {
  }

  ngOnInit(): void {
  }

}
