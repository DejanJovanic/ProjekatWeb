import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarEnterpriseEditModalComponent } from './rent-acar-enterprise-edit-modal.component';

describe('RentACarEnterpriseEditModalComponent', () => {
  let component: RentACarEnterpriseEditModalComponent;
  let fixture: ComponentFixture<RentACarEnterpriseEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarEnterpriseEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarEnterpriseEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
