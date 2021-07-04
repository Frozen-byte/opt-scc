import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BattleId } from '../../route-outlets/battle/battle.types';
import { SideId } from '../../route-outlets/campaign/campaign.component';

export type SectorId = string;
export interface Sector {
  occupant: SideId;
  disabled: boolean;
  selected: boolean;
  sectorName: string;
  sectorId: SectorId;
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
export class SectorSelectComponent implements OnInit {
  public sectors?: Sector[];

  @Input() battleId!: BattleId;
  @Input() selectedSector?: SectorId;
  @Output() selectedSectorChange = new EventEmitter<SectorId>();

  constructor(public db: AngularFireDatabase) {}

  private _disabled = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(v: boolean | string) {
    this._disabled = v !== undefined;
  }

  ngOnInit(): void {
    this.db
      .list<Sector>(`maps/${this.battleId}`)
      .valueChanges()
      .subscribe((v) => (this.sectors = v));
  }

  onClick($event: MouseEvent, sector: Sector): void {
    if (!this.disabled && !sector.disabled) {
      this.selectedSector =
        this.selectedSector === sector.sectorId ? undefined : sector.sectorId;
      this.selectedSectorChange.next(this.selectedSector);
    }
  }
}
