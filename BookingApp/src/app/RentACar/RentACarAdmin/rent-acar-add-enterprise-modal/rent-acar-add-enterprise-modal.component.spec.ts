import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarAddEnterpriseModalComponent } from './rent-acar-add-enterprise-modal.component';

describe('RentACarAddEnterpriseModalComponent', () => {
  let component: RentACarAddEnterpriseModalComponent;
  let fixture: ComponentFixture<RentACarAddEnterpriseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarAddEnterpriseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarAddEnterpriseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
