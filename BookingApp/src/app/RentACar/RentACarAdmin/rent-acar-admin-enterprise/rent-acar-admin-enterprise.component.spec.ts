import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarAdminEnterpriseComponent } from './rent-acar-admin-enterprise.component';

describe('RentACarAdminEnterpriseComponent', () => {
  let component: RentACarAdminEnterpriseComponent;
  let fixture: ComponentFixture<RentACarAdminEnterpriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarAdminEnterpriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarAdminEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
