import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineRateComponent } from './airline-rate.component';

describe('AirlineRateComponent', () => {
  let component: AirlineRateComponent;
  let fixture: ComponentFixture<AirlineRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
