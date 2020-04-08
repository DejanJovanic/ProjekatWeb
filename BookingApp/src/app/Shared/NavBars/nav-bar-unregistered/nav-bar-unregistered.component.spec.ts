import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarUnregisteredComponent } from './nav-bar-unregistered.component';

describe('NavBarUnregisteredComponent', () => {
  let component: NavBarUnregisteredComponent;
  let fixture: ComponentFixture<NavBarUnregisteredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarUnregisteredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarUnregisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
