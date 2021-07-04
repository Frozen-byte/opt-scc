import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  distinctUntilChanged,
  filter,
  map,
  pluck,
  switchMap,
} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { BattleSectorSelectDialogComponent } from '../../components/battle-sector-select-dialog/battle-sector-select-dialog.component';
import { Battle } from './battle.types';
import { BattleListService } from '../../services/battle-list.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { isDefinedGuard } from '../../toolbelt';

@UntilDestroy()
@Component({
  selector: 'opt-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
})
export class BattleComponent implements OnInit {
  battle$ = this.route.params.pipe(
    pluck('battleId'),
    distinctUntilChanged(),
    switchMap((battleId) => {
      return this.battleService.getBattle(battleId);
    })
  );

  nextBattleLink$ = this.battle$.pipe(
    filter(isDefinedGuard),
    switchMap((battle) => this.battleService.getNextBattle(battle?.battleDate)),
    map((nextBattle) => `/battle/${nextBattle.battleId}`)
  );
  prevBattleLink$ = this.battle$.pipe(
    filter(isDefinedGuard),
    switchMap((battle) =>
      this.battleService.getPreviousBattle(battle?.battleDate)
    ),
    map((prevBattle) => `/battle/${prevBattle.battleId}`)
  );

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private battleService: BattleListService
  ) {}

  ngOnInit(): void {}

  openSectorSelectDialog(battle: Battle): void {
    this.dialog.open(BattleSectorSelectDialogComponent, {
      data: { battle },
    });
  }
}
