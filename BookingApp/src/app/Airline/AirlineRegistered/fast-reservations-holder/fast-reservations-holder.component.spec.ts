import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastReservationsHolderComponent } from './fast-reservations-holder.component';

describe('FastReservationsHolderComponent', () => {
  let component: FastReservationsHolderComponent;
  let fixture: ComponentFixture<FastReservationsHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastReservationsHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastReservationsHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
