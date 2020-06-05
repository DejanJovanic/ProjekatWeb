import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarEditBranchModalComponent } from './rent-acar-edit-branch-modal.component';

describe('RentACarEditBranchModalComponent', () => {
  let component: RentACarEditBranchModalComponent;
  let fixture: ComponentFixture<RentACarEditBranchModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarEditBranchModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarEditBranchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
