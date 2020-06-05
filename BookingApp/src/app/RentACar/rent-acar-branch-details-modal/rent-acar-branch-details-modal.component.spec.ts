import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarBranchDetailsModalComponent } from './rent-acar-branch-details-modal.component';

describe('RentACarBranchDetailsModalComponent', () => {
  let component: RentACarBranchDetailsModalComponent;
  let fixture: ComponentFixture<RentACarBranchDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarBranchDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarBranchDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
