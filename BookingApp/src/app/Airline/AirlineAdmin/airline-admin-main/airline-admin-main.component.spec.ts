import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineAdminMainComponent } from './airline-admin-main.component';

describe('AirlineAdminMainComponent', () => {
  let component: AirlineAdminMainComponent;
  let fixture: ComponentFixture<AirlineAdminMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineAdminMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineAdminMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
