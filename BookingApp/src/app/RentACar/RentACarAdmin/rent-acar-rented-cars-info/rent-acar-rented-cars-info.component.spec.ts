import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarRentedCarsInfoComponent } from './rent-acar-rented-cars-info.component';

describe('RentACarRentedCarsInfoComponent', () => {
  let component: RentACarRentedCarsInfoComponent;
  let fixture: ComponentFixture<RentACarRentedCarsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarRentedCarsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarRentedCarsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
