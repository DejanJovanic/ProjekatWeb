import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarSetDiscountModalComponent } from './rent-acar-set-discount-modal.component';

describe('RentACarSetDiscountModalComponent', () => {
  let component: RentACarSetDiscountModalComponent;
  let fixture: ComponentFixture<RentACarSetDiscountModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarSetDiscountModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarSetDiscountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
