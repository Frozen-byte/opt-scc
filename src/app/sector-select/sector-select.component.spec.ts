import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorSelectComponent } from './sector-select.component';

describe('SectorSelectComponent', () => {
  let component: SectorSelectComponent;
  let fixture: ComponentFixture<SectorSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectorSelectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
