import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

class DialogData {}

@Component({
  selector: 'opt-battle-sector-select-dialog',
  templateUrl: './battle-sector-select-dialog.component.html',
  styleUrls: ['./battle-sector-select-dialog.component.scss'],
})
export class BattleSectorSelectDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {}
}
