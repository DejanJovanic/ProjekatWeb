import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAirlineHolderComponent } from './admin-airline-holder.component';

describe('AdminAirlineHolderComponent', () => {
  let component: AdminAirlineHolderComponent;
  let fixture: ComponentFixture<AdminAirlineHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAirlineHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAirlineHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
