import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarAddCarModalComponent } from './rent-acar-add-car-modal.component';

describe('RentACarAddCarModalComponent', () => {
  let component: RentACarAddCarModalComponent;
  let fixture: ComponentFixture<RentACarAddCarModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarAddCarModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarAddCarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
