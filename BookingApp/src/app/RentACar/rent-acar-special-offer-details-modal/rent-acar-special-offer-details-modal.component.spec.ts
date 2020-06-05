import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarSpecialOfferDetailsModalComponent } from './rent-acar-special-offer-details-modal.component';

describe('RentACarSpecialOfferDetailsModalComponent', () => {
  let component: RentACarSpecialOfferDetailsModalComponent;
  let fixture: ComponentFixture<RentACarSpecialOfferDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarSpecialOfferDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarSpecialOfferDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
