import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarReservationComponent } from './rent-acar-reservation.component';

describe('RentACarReservationComponent', () => {
  let component: RentACarReservationComponent;
  let fixture: ComponentFixture<RentACarReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
