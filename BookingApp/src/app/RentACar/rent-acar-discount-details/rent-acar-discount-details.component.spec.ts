import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarDiscountDetailsComponent } from './rent-acar-discount-details.component';

describe('RentACarDiscountDetailsComponent', () => {
  let component: RentACarDiscountDetailsComponent;
  let fixture: ComponentFixture<RentACarDiscountDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarDiscountDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarDiscountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
