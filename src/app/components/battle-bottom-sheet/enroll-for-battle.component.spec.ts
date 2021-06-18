import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollForBattleComponent } from './enroll-for-battle.component';

describe('BattleBottomSheetComponent', () => {
  let component: EnrollForBattleComponent;
  let fixture: ComponentFixture<EnrollForBattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnrollForBattleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollForBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
