import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsHolderComponent } from './friends-holder.component';

describe('FriendsHolderComponent', () => {
  let component: FriendsHolderComponent;
  let fixture: ComponentFixture<FriendsHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
