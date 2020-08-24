import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarDeleteSOModalComponent } from './rent-acar-delete-somodal.component';

describe('RentACarDeleteSOModalComponent', () => {
  let component: RentACarDeleteSOModalComponent;
  let fixture: ComponentFixture<RentACarDeleteSOModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarDeleteSOModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarDeleteSOModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
