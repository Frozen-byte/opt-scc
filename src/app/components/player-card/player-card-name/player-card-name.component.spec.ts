import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCardNameComponent } from './player-card-name.component';

describe('PlayerCardNameComponent', () => {
  let component: PlayerCardNameComponent;
  let fixture: ComponentFixture<PlayerCardNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerCardNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerCardNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
