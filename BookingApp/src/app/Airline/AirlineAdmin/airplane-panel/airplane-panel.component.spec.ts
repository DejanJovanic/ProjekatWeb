import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplanePanelComponent } from './airplane-panel.component';

describe('AirplanePanelComponent', () => {
  let component: AirplanePanelComponent;
  let fixture: ComponentFixture<AirplanePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirplanePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplanePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
