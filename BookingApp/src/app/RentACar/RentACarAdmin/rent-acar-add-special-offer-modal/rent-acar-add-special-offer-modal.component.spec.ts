import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarAddSpecialOfferModalComponent } from './rent-acar-add-special-offer-modal.component';

describe('RentACarAddSpecialOfferModalComponent', () => {
  let component: RentACarAddSpecialOfferModalComponent;
  let fixture: ComponentFixture<RentACarAddSpecialOfferModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarAddSpecialOfferModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarAddSpecialOfferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
