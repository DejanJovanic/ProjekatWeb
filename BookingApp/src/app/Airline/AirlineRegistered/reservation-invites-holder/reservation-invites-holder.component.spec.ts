import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationInvitesHolderComponent } from './reservation-invites-holder.component';

describe('ReservationInvitesHolderComponent', () => {
  let component: ReservationInvitesHolderComponent;
  let fixture: ComponentFixture<ReservationInvitesHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationInvitesHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationInvitesHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
