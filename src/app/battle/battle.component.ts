import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, pluck, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { BattleSectorSelectDialogComponent } from '../battle-sector-select-dialog/battle-sector-select-dialog.component';
import { Battle } from './battle.types';
import { BattleListService } from '../services/battle-list.service';

@Component({
  selector: 'opt-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css'],
})
export class BattleComponent implements OnInit {
  public battle$: Observable<Battle | null>;
  public userId: string | undefined;

  constructor(
    public dialog: MatDialog,
    auth: AngularFireAuth,
    route: ActivatedRoute,
    battleService: BattleListService
  ) {
    auth.user.subscribe((user) => {
      this.userId = user?.uid;
    });

    this.battle$ = route.params.pipe(
      pluck('battleId'),
      distinctUntilChanged(),
      switchMap((battleId) => {
        return battleService.getBattle(battleId);
      })
    );
  }

  ngOnInit(): void {}

  openSectorSelectDialog(): void {
    const dialogRef = this.dialog.open(BattleSectorSelectDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
