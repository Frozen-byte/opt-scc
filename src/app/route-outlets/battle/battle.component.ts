import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  distinctUntilChanged,
  filter,
  map,
  pluck,
  switchMap,
} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BattleSectorSelectDialogComponent } from '../../components/battle-sector-select-dialog/battle-sector-select-dialog.component';
import { Battle } from './battle.types';
import { BattleListService } from '../../services/battle-list.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BattleBottomSheetComponent } from '../../components/battle-bottom-sheet/battle-bottom-sheet.component';

@UntilDestroy()
@Component({
  selector: 'opt-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
})
export class BattleComponent implements OnInit {
  public battle$: Observable<Battle | null>;

  constructor(
    public dialog: MatDialog,
    public bottomSheet: MatBottomSheet,
    route: ActivatedRoute,
    battleService: BattleListService
  ) {
    this.battle$ = route.params.pipe(
      pluck('battleId'),
      distinctUntilChanged(),
      switchMap((battleId) => {
        return battleService.getBattle(battleId);
      })
    );
  }

  ngOnInit(): void {
    this.battle$
      .pipe(
        filter((battle) => !!battle?.battleId),
        map((battle) => battle?.battleId as string),
        untilDestroyed(this)
      )
      .subscribe((battleId) => {
        this.openEnrollOnBattleBottomSheet(battleId);
      });
  }

  openEnrollOnBattleBottomSheet(battleId: Battle['battleId']): void {
    this.bottomSheet.open(BattleBottomSheetComponent, {
      hasBackdrop: false,
      data: {
        battleId,
      },
    });
  }

  openSectorSelectDialog(battleId: Battle['battleId']): void {
    const dialogRef = this.dialog.open(BattleSectorSelectDialogComponent, {
      data: { battleId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
