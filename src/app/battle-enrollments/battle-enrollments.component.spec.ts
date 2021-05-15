import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleEnrollmentsComponent } from './battle-enrollments.component';

describe('BattleEnrollmentsComponent', () => {
  let component: BattleEnrollmentsComponent;
  let fixture: ComponentFixture<BattleEnrollmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BattleEnrollmentsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleEnrollmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
