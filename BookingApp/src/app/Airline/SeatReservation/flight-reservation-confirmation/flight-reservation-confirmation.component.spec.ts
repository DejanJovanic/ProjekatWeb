import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightReservationConfirmationComponent } from './flight-reservation-confirmation.component';

describe('FlightReservationConfirmationComponent', () => {
  let component: FlightReservationConfirmationComponent;
  let fixture: ComponentFixture<FlightReservationConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightReservationConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightReservationConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
