import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastFlightPanelComponent } from './fast-flight-panel.component';

describe('FastFlightPanelComponent', () => {
  let component: FastFlightPanelComponent;
  let fixture: ComponentFixture<FastFlightPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastFlightPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastFlightPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
