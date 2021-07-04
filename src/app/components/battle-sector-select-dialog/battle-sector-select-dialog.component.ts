import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BattleListService } from '../../services/battle-list.service';
import { SectorId } from '../sector-select/sector-select.component';
import { Battle } from '../../route-outlets/battle/battle.types';
import { PlayerService } from '../../services/player.service';
import { first, switchMap } from 'rxjs/operators';

@Component({
  selector: 'opt-battle-sector-select-dialog',
  templateUrl: './battle-sector-select-dialog.component.html',
  styleUrls: ['./battle-sector-select-dialog.component.scss'],
})
export class BattleSectorSelectDialogComponent implements OnInit {
  public selectedSectorId?: SectorId;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      battle: Battle;
    },
    private dialogRef: MatDialogRef<BattleSectorSelectDialogComponent>,
    private battleService: BattleListService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {}

  save(): void {
    this.playerService
      .getLoggedInPlayer(this.data.battle.campaignId)
      .pipe(
        first(), // dont re-exec this on login/logout
        switchMap((player) => {
          if (this.selectedSectorId && player) {
            return this.battleService.saveAttackingSector(
              this.data.battle,
              player.defaultFactionId,
              this.selectedSectorId
            );
          }
          return Promise.reject('selectedSectorId or player is falsish');
        })
      )
      .subscribe(() => this.dialogRef.close());
  }
}
