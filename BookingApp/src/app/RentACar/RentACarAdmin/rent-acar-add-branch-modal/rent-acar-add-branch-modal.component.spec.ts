import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarAddBranchModalComponent } from './rent-acar-add-branch-modal.component';

describe('RentACarAddBranchModalComponent', () => {
  let component: RentACarAddBranchModalComponent;
  let fixture: ComponentFixture<RentACarAddBranchModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarAddBranchModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarAddBranchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
