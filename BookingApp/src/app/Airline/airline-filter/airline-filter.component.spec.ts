import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineFilterComponent} from './airline-filter.component';

describe('AirlineFilterComponentComponent', () => {
  let component: AirlineFilterComponent;
  let fixture: ComponentFixture<AirlineFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
