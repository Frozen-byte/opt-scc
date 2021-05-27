import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleSectorSelectDialogComponent } from './battle-sector-select-dialog.component';

describe('BattleSectorSelectDialogComponent', () => {
  let component: BattleSectorSelectDialogComponent;
  let fixture: ComponentFixture<BattleSectorSelectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BattleSectorSelectDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleSectorSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
