import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatAssignmentComponent } from './seat-assignment.component';

describe('SeatAssignmentComponent', () => {
  let component: SeatAssignmentComponent;
  let fixture: ComponentFixture<SeatAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
