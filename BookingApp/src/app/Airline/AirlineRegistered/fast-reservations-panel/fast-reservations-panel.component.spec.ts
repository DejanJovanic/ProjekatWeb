import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastReservationsPanelComponent } from './fast-reservations-panel.component';

describe('FastReservationsPanelComponent', () => {
  let component: FastReservationsPanelComponent;
  let fixture: ComponentFixture<FastReservationsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastReservationsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastReservationsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
