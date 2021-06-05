import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentForm } from './enrollment-form.component';

describe('EnrollOnBattleComponent', () => {
  let component: EnrollmentForm;
  let fixture: ComponentFixture<EnrollmentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnrollmentForm],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
