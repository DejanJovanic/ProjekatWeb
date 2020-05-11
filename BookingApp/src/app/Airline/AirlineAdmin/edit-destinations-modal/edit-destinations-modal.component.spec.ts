import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDestinationsModalComponent } from './edit-destinations-modal.component';

describe('EditDestinationsModalComponent', () => {
  let component: EditDestinationsModalComponent;
  let fixture: ComponentFixture<EditDestinationsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDestinationsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDestinationsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
