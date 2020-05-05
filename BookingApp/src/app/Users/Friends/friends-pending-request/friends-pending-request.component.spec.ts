import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsPendingRequestComponent } from './friends-pending-request.component';

describe('FriendsPendingRequestComponent', () => {
  let component: FriendsPendingRequestComponent;
  let fixture: ComponentFixture<FriendsPendingRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsPendingRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsPendingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
