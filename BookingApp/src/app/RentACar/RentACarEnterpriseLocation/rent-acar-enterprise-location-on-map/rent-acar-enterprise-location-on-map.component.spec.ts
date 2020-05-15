import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarEnterpriseLocationOnMapComponent } from './rent-acar-enterprise-location-on-map.component';

describe('RentACarEnterpriseLocationOnMapComponent', () => {
  let component: RentACarEnterpriseLocationOnMapComponent;
  let fixture: ComponentFixture<RentACarEnterpriseLocationOnMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarEnterpriseLocationOnMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarEnterpriseLocationOnMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
