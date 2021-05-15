import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteamVerifyComponent } from './steam-verify.component';

describe('SteamVerifyComponent', () => {
  let component: SteamVerifyComponent;
  let fixture: ComponentFixture<SteamVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SteamVerifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SteamVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
