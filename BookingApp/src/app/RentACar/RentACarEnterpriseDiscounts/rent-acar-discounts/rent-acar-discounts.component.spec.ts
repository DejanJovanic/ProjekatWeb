import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarDiscountsComponent } from './rent-acar-discounts.component';

describe('RentACarDiscountsComponent', () => {
  let component: RentACarDiscountsComponent;
  let fixture: ComponentFixture<RentACarDiscountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarDiscountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
