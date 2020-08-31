import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationInvitesMainComponent } from './reservation-invites-main.component';

describe('ReservationInvitesMainComponent', () => {
  let component: ReservationInvitesMainComponent;
  let fixture: ComponentFixture<ReservationInvitesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationInvitesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationInvitesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
