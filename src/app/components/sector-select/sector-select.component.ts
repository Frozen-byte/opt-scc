import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BattleId } from '../../route-outlets/battle/battle.types';
import { SideId } from '../../route-outlets/campaign/campaign.component';
import { SectorService } from '../../services/sector.service';
import { switchMap } from 'rxjs/operators';

export type SectorId = string;
export interface Sector {
  occupant: SideId;
  disabled: boolean;
  selected: boolean;
  sectorName: string;
  sectorId: SectorId;
  playedCount: number;
  path: string; // SVG Draw Command
}

/**
 * @prop {boolean} disabled - Disabled the interaction, component will behave like a svg.
 * @prop {Sector} selectedSector - currently selected Sector
 */
@Component({
  selector: 'opt-sector-select[battleId]',
  templateUrl: './sector-select.component.html',
  styleUrls: ['./sector-select.component.scss'],
})
export class SectorSelectComponent implements OnChanges {
  public sectors: Sector[] = [];

  @Input() battleId!: BattleId;
  battleId$ = new EventEmitter<BattleId>();

  @Input() selectedSector?: SectorId;
  @Output() selectedSectorChange = new EventEmitter<SectorId>();

  constructor(public sectorService: SectorService) {
    this.battleId$
      .pipe(switchMap((battleId) => this.sectorService.getBattleMap(battleId)))
      .subscribe((battleMap) => {
        this.sectors = battleMap ? Object.values(battleMap) : [];
      });
  }

  private _disabled = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(v: boolean | string) {
    this._disabled = v !== undefined;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.battleId$.emit(changes.battleId?.currentValue);
  }

  onClick($event: MouseEvent, sector: Sector): void {
    if (!this.disabled && !sector.disabled) {
      this.selectedSector =
        this.selectedSector === sector.sectorId ? undefined : sector.sectorId;
      this.selectedSectorChange.next(this.selectedSector);
    }
  }
}
