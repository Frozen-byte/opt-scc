import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCardAvatarComponent } from './player-card-avatar.component';

describe('PlayerAvatarComponent', () => {
  let component: PlayerCardAvatarComponent;
  let fixture: ComponentFixture<PlayerCardAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerCardAvatarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerCardAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
