import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastFlightHolderComponent } from './fast-flight-holder.component';

describe('FastFlightHolderComponent', () => {
  let component: FastFlightHolderComponent;
  let fixture: ComponentFixture<FastFlightHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastFlightHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastFlightHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
