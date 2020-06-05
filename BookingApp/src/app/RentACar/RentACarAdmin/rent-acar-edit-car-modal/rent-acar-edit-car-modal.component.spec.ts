import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarEditCarModalComponent } from './rent-acar-edit-car-modal.component';

describe('RentACarEditCarModalComponent', () => {
  let component: RentACarEditCarModalComponent;
  let fixture: ComponentFixture<RentACarEditCarModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarEditCarModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarEditCarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
