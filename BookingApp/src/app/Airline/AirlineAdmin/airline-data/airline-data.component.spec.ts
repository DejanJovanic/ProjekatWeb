import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineDataComponent } from './airline-data.component';

describe('AirlineDataComponent', () => {
  let component: AirlineDataComponent;
  let fixture: ComponentFixture<AirlineDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
