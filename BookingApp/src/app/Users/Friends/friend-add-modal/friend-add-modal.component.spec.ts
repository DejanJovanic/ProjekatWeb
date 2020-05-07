import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendAddModalComponent } from './friend-add-modal.component';

describe('FriendAddModalComponent', () => {
  let component: FriendAddModalComponent;
  let fixture: ComponentFixture<FriendAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
