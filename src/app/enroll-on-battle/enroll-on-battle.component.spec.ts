import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollOnBattleComponent } from './enroll-on-battle.component';

describe('EnrollOnBattleComponent', () => {
  let component: EnrollOnBattleComponent;
  let fixture: ComponentFixture<EnrollOnBattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnrollOnBattleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollOnBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
