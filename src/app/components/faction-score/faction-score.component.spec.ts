import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactionScoreComponent } from './faction-score.component';

describe('FactionScoreComponent', () => {
  let component: FactionScoreComponent;
  let fixture: ComponentFixture<FactionScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FactionScoreComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactionScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
