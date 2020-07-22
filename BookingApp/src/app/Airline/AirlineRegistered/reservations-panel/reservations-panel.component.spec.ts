import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsPanelComponent } from './reservations-panel.component';

describe('ReservationsPanelComponent', () => {
  let component: ReservationsPanelComponent;
  let fixture: ComponentFixture<ReservationsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
