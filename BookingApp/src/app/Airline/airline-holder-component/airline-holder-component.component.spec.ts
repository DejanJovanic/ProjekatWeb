import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineHolderComponentComponent } from './airline-holder-component.component';

describe('AirlineHolderComponentComponent', () => {
  let component: AirlineHolderComponentComponent;
  let fixture: ComponentFixture<AirlineHolderComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineHolderComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineHolderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
