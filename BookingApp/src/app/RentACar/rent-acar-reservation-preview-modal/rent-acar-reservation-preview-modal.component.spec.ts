import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarReservationPreviewModalComponent } from './rent-acar-reservation-preview-modal.component';

describe('RentACarReservationPreviewModalComponent', () => {
  let component: RentACarReservationPreviewModalComponent;
  let fixture: ComponentFixture<RentACarReservationPreviewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarReservationPreviewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarReservationPreviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
