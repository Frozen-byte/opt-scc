import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleBottomSheetComponent } from './battle-bottom-sheet.component';

describe('BattleBottomSheetComponent', () => {
  let component: BattleBottomSheetComponent;
  let fixture: ComponentFixture<BattleBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattleBottomSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
