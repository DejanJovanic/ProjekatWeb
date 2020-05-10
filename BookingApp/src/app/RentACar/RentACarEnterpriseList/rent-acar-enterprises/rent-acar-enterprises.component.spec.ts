import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarEnterprisesComponent } from './rent-acar-enterprises.component';

describe('RentACarEnterprisesComponent', () => {
  let component: RentACarEnterprisesComponent;
  let fixture: ComponentFixture<RentACarEnterprisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarEnterprisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarEnterprisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
