import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarDeleteCarModalComponent } from './rent-acar-delete-car-modal.component';

describe('RentACarDeleteCarModalComponent', () => {
  let component: RentACarDeleteCarModalComponent;
  let fixture: ComponentFixture<RentACarDeleteCarModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarDeleteCarModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarDeleteCarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
