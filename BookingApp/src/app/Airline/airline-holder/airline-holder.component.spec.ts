import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineHolderComponent} from './airline-holder.component';

describe('AirlineHolderComponent', () => {
  let component: AirlineHolderComponent;
  let fixture: ComponentFixture<AirlineHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
