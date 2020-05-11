import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarEnterpriseProfileComponent } from './rent-acar-enterprise-profile.component';

describe('RentACarEnterpriseProfileComponent', () => {
  let component: RentACarEnterpriseProfileComponent;
  let fixture: ComponentFixture<RentACarEnterpriseProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarEnterpriseProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarEnterpriseProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
