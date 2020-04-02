import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineMainComponent } from './airline-main.component';

describe('AirlineMainComponent', () => {
  let component: AirlineMainComponent;
  let fixture: ComponentFixture<AirlineMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
