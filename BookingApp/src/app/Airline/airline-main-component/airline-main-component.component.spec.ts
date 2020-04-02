import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineMainComponentComponent } from './airline-main-component.component';

describe('AirlineMainComponentComponent', () => {
  let component: AirlineMainComponentComponent;
  let fixture: ComponentFixture<AirlineMainComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineMainComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineMainComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
