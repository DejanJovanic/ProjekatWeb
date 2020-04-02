import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineFilterComponentComponent } from './airline-filter-component.component';

describe('AirlineFilterComponentComponent', () => {
  let component: AirlineFilterComponentComponent;
  let fixture: ComponentFixture<AirlineFilterComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineFilterComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineFilterComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
