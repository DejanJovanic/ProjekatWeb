import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarAdminEditInfoComponent } from './rent-acar-admin-edit-info.component';

describe('RentACarAdminEditInfoComponent', () => {
  let component: RentACarAdminEditInfoComponent;
  let fixture: ComponentFixture<RentACarAdminEditInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarAdminEditInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarAdminEditInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
