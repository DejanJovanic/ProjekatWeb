import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDefineDiscountModalComponent } from './admin-define-discount-modal.component';

describe('AdminDefineDiscountModalComponent', () => {
  let component: AdminDefineDiscountModalComponent;
  let fixture: ComponentFixture<AdminDefineDiscountModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDefineDiscountModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDefineDiscountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
