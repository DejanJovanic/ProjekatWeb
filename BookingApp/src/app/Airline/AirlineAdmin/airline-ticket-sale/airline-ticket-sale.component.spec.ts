import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineTicketSaleComponent } from './airline-ticket-sale.component';

describe('AirlineTicketSaleComponent', () => {
  let component: AirlineTicketSaleComponent;
  let fixture: ComponentFixture<AirlineTicketSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineTicketSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineTicketSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
