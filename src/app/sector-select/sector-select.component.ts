import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

export interface Sector {
  color: 'red' | 'green';
  disabled: boolean;
  selected: boolean;
  name: string;
  id: string;
  path: string; // SVG Draw Command
}

/**
 * @prop {boolean} disabled - Disabled the interaction, component will behave like a svg.
 * @prop {Sector} selectedSector - currently selected Sector
 */
@Component({
  selector: 'opt-sector-select',
  templateUrl: './sector-select.component.html',
  styleUrls: ['./sector-select.component.css'],
})
export class SectorSelectComponent implements OnInit {
  public sectors?: Sector[];

  @Input() selectedSector?: Sector['id'];
  @Output() selectedSectorChange = new EventEmitter<Sector['id']>();

  constructor(public db: AngularFireDatabase) {
    const campaignId = 'adl';
    db.list<Sector>(`maps/${campaignId}`)
      .valueChanges()
      .subscribe((v) => (this.sectors = v));
  }

  private _disabled = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(v: boolean) {
    this._disabled = v !== undefined;
  }

  ngOnInit(): void {}

  onClick($event: MouseEvent, sector: Sector): void {
    if (!this.disabled && !sector.disabled) {
      this.selectedSector =
        this.selectedSector === sector.id ? undefined : sector.id;
      this.selectedSectorChange.emit(this.selectedSector);
    }
  }
}
