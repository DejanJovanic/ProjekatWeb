import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarEditSpecialOffersModalComponent } from './rent-acar-edit-special-offers-modal.component';

describe('RentACarEditSpecialOffersModalComponent', () => {
  let component: RentACarEditSpecialOffersModalComponent;
  let fixture: ComponentFixture<RentACarEditSpecialOffersModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarEditSpecialOffersModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarEditSpecialOffersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
