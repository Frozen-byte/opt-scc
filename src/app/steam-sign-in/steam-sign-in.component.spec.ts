import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteamSignInComponent } from './steam-sign-in.component';

describe('SteamSignInComponent', () => {
  let component: SteamSignInComponent;
  let fixture: ComponentFixture<SteamSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SteamSignInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SteamSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
