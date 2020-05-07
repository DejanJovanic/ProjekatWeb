import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlinePanelComponent } from './airline-panel.component';

describe('AirlinePanelComponent', () => {
  let component: AirlinePanelComponent;
  let fixture: ComponentFixture<AirlinePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlinePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlinePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
