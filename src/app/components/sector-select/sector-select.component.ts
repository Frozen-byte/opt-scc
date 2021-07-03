import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Battle } from '../../route-outlets/battle/battle.types';
import { SideId } from '../../route-outlets/campaign/campaign.component';

export interface Sector {
  occupant: SideId;
  disabled: boolean;
  selected: boolean;
  sectorName: string;
  sectorId: string;
  path: string; // SVG Draw Command
}

/**
 * @prop {boolean} disabled - Disabled the interaction, component will behave like a svg.
 * @prop {Sector} selectedSector - currently selected Sector
 */
@Component({
  selector: 'opt-sector-select',
  templateUrl: './sector-select.component.html',
  styleUrls: ['./sector-select.component.scss'],
})
export class SectorSelectComponent implements OnInit {
  public sectors?: Sector[];

  @Input() battleId?: Battle['battleId'];
  @Input() selectedSector?: Sector['sectorId'];
  @Output() selectedSectorChange = new EventEmitter<Sector['sectorId']>();

  constructor(public db: AngularFireDatabase) {}

  private _disabled = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(v: boolean) {
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
