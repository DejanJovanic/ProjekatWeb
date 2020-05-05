import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsPanelComponent } from './friends-panel.component';

describe('FriendsPanelComponent', () => {
  let component: FriendsPanelComponent;
  let fixture: ComponentFixture<FriendsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
