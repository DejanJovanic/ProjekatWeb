import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarBranchesComponent } from './rent-acar-branches.component';

describe('RentACarBranchesComponent', () => {
  let component: RentACarBranchesComponent;
  let fixture: ComponentFixture<RentACarBranchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarBranchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
