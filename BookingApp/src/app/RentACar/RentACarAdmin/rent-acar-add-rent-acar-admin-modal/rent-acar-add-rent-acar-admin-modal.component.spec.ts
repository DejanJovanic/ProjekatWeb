import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarAddRentACarAdminModalComponent } from './rent-acar-add-rent-acar-admin-modal.component';

describe('RentACarAddRentACarAdminModalComponent', () => {
  let component: RentACarAddRentACarAdminModalComponent;
  let fixture: ComponentFixture<RentACarAddRentACarAdminModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarAddRentACarAdminModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarAddRentACarAdminModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
