import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarDeleteBranchModalComponent } from './rent-acar-delete-branch-modal.component';

describe('RentACarDeleteBranchModalComponent', () => {
  let component: RentACarDeleteBranchModalComponent;
  let fixture: ComponentFixture<RentACarDeleteBranchModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarDeleteBranchModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarDeleteBranchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
