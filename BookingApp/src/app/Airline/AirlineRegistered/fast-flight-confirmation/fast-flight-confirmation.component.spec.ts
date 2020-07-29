import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastFlightConfirmationComponent } from './fast-flight-confirmation.component';

describe('FastFlightConfirmationComponent', () => {
  let component: FastFlightConfirmationComponent;
  let fixture: ComponentFixture<FastFlightConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastFlightConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastFlightConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
