import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableSeatComponent } from './disable-seat.component';

describe('DisableSeatComponent', () => {
  let component: DisableSeatComponent;
  let fixture: ComponentFixture<DisableSeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisableSeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisableSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
