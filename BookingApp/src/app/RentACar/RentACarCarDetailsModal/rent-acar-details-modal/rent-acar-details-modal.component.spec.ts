import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarDetailsModalComponent } from './rent-acar-details-modal.component';

describe('RentACarDetailsModalComponent', () => {
  let component: RentACarDetailsModalComponent;
  let fixture: ComponentFixture<RentACarDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
