import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineEarningsComponent } from './airline-earnings.component';

describe('AirlineEarningsComponent', () => {
  let component: AirlineEarningsComponent;
  let fixture: ComponentFixture<AirlineEarningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineEarningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineEarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
