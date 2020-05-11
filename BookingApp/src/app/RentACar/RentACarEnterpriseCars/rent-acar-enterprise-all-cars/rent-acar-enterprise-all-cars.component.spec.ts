import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarEnterpriseAllCarsComponent } from './rent-acar-enterprise-all-cars.component';

describe('RentACarEnterpriseAllCarsComponent', () => {
  let component: RentACarEnterpriseAllCarsComponent;
  let fixture: ComponentFixture<RentACarEnterpriseAllCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarEnterpriseAllCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarEnterpriseAllCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
