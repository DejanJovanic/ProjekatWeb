import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSystemAdminModalComponent } from './add-system-admin-modal.component';

describe('AddSystemAdminModalComponent', () => {
  let component: AddSystemAdminModalComponent;
  let fixture: ComponentFixture<AddSystemAdminModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSystemAdminModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSystemAdminModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
