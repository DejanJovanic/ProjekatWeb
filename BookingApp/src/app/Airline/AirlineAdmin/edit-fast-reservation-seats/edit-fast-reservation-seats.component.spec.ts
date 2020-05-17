import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFastReservationSeatsComponent } from './edit-fast-reservation-seats.component';

describe('EditFastReservationSeatsComponent', () => {
  let component: EditFastReservationSeatsComponent;
  let fixture: ComponentFixture<EditFastReservationSeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFastReservationSeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFastReservationSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
