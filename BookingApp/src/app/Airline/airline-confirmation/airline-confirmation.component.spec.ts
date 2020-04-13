import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineConfirmationComponent } from './airline-confirmation.component';

describe('AirlineConfirmationComponent', () => {
  let component: AirlineConfirmationComponent;
  let fixture: ComponentFixture<AirlineConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
