import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarAdminChangePassComponent } from './rent-acar-admin-change-pass.component';

describe('RentACarAdminChangePassComponent', () => {
  let component: RentACarAdminChangePassComponent;
  let fixture: ComponentFixture<RentACarAdminChangePassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarAdminChangePassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarAdminChangePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
