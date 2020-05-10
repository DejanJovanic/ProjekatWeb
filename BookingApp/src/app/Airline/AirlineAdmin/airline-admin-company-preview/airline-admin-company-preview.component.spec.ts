import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineAdminCompanyPreviewComponent } from './airline-admin-company-preview.component';

describe('AirlineAdminCompanyPreviewComponent', () => {
  let component: AirlineAdminCompanyPreviewComponent;
  let fixture: ComponentFixture<AirlineAdminCompanyPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineAdminCompanyPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineAdminCompanyPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
