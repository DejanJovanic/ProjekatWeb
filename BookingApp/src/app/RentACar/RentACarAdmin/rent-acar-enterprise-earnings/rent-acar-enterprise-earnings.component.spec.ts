import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarEnterpriseEarningsComponent } from './rent-acar-enterprise-earnings.component';

describe('RentACarEnterpriseEarningsComponent', () => {
  let component: RentACarEnterpriseEarningsComponent;
  let fixture: ComponentFixture<RentACarEnterpriseEarningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarEnterpriseEarningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarEnterpriseEarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
