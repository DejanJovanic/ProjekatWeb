import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineRatingsComponent } from './airline-ratings.component';

describe('AirlineRatingsComponent', () => {
  let component: AirlineRatingsComponent;
  let fixture: ComponentFixture<AirlineRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
