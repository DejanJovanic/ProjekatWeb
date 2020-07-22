import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsHolderComponent } from './reservations-holder.component';

describe('ReservationsHolderComponent', () => {
  let component: ReservationsHolderComponent;
  let fixture: ComponentFixture<ReservationsHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationsHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
