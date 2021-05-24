import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

export interface Sector {
  color: 'red' | 'green';
  disabled: boolean;
  selected: boolean;
  name: string;
  id: string;
  path: string; // SVG Draw Command
}

@Component({
  selector: 'app-sector-select',
  templateUrl: './sector-select.component.html',
  styleUrls: ['./sector-select.component.css'],
})
export class SectorSelectComponent implements OnInit {
  sectors$: Observable<Sector[]>;
  selectedSector?: Sector['id'];

  constructor(db: AngularFireDatabase) {
    const campaignId = 'adl';
    this.sectors$ = db.list<Sector>(`maps/${campaignId}`).valueChanges();
  }

  ngOnInit(): void {}

  onClick($event: MouseEvent, sector: Sector): void {
    if (!sector.disabled) {
      this.selectedSector =
        this.selectedSector === sector.id ? undefined : sector.id;
    }
  }
}
