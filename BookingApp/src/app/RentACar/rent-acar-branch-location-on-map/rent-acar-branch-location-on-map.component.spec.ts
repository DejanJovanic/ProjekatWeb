import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarBranchLocationOnMapComponent } from './rent-acar-branch-location-on-map.component';

describe('RentACarBranchLocationOnMapComponent', () => {
  let component: RentACarBranchLocationOnMapComponent;
  let fixture: ComponentFixture<RentACarBranchLocationOnMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarBranchLocationOnMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarBranchLocationOnMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
