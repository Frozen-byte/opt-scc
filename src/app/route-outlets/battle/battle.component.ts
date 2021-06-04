import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, pluck, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BattleSectorSelectDialogComponent } from '../../components/battle-sector-select-dialog/battle-sector-select-dialog.component';
import { Battle } from './battle.types';
import { BattleListService } from '../../services/battle-list.service';
import { UntilDestroy } from '@ngneat/until-destroy';

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

  ngOnInit(): void {}

  openSectorSelectDialog(battleId: Battle['battleId']): void {
    const dialogRef = this.dialog.open(BattleSectorSelectDialogComponent, {
      data: { battleId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
