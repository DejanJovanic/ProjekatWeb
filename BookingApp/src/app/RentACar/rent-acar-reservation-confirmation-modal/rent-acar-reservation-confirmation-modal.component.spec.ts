import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarReservationConfirmationModalComponent } from './rent-acar-reservation-confirmation-modal.component';

describe('RentACarReservationConfirmationModalComponent', () => {
  let component: RentACarReservationConfirmationModalComponent;
  let fixture: ComponentFixture<RentACarReservationConfirmationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarReservationConfirmationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarReservationConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
