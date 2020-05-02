import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendChooseModalComponent } from './friend-choose-modal.component';

describe('FriendChooseModalComponent', () => {
  let component: FriendChooseModalComponent;
  let fixture: ComponentFixture<FriendChooseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendChooseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendChooseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
