import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableSeatComponent } from './enable-seat.component';

describe('EnableSeatComponent', () => {
  let component: EnableSeatComponent;
  let fixture: ComponentFixture<EnableSeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnableSeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnableSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
