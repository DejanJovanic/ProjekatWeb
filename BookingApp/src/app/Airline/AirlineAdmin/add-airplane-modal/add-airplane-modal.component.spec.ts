import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAirplaneModalComponent } from './add-airplane-modal.component';

describe('AddAirplaneModalComponent', () => {
  let component: AddAirplaneModalComponent;
  let fixture: ComponentFixture<AddAirplaneModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAirplaneModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAirplaneModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
