import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineSearchComponentComponent } from './airline-search-component.component';

describe('AirlineSearchComponentComponent', () => {
  let component: AirlineSearchComponentComponent;
  let fixture: ComponentFixture<AirlineSearchComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineSearchComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineSearchComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
