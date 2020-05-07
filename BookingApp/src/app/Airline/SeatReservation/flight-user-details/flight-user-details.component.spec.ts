import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightUserDetailsComponent } from './flight-user-details.component';

describe('FlightUserDetailsComponent', () => {
  let component: FlightUserDetailsComponent;
  let fixture: ComponentFixture<FlightUserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightUserDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
