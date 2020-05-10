import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineDetailsModalComponent } from './airline-details-modal.component';

describe('AirlineDetailsModalComponent', () => {
  let component: AirlineDetailsModalComponent;
  let fixture: ComponentFixture<AirlineDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
