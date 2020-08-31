import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarFastReservationConfirmationComponent } from './rent-acar-fast-reservation-confirmation.component';

describe('RentACarFastReservationConfirmationComponent', () => {
  let component: RentACarFastReservationConfirmationComponent;
  let fixture: ComponentFixture<RentACarFastReservationConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarFastReservationConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarFastReservationConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
