import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleLinkComponent } from './battle-link.component';

describe('BattleLinkComponent', () => {
  let component: BattleLinkComponent;
  let fixture: ComponentFixture<BattleLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BattleLinkComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
