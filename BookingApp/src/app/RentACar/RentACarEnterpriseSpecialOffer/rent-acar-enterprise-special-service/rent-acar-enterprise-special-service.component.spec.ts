import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarEnterpriseSpecialServiceComponent } from './rent-acar-enterprise-special-service.component';

describe('RentACarEnterpriseSpecialServiceComponent', () => {
  let component: RentACarEnterpriseSpecialServiceComponent;
  let fixture: ComponentFixture<RentACarEnterpriseSpecialServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarEnterpriseSpecialServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarEnterpriseSpecialServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
