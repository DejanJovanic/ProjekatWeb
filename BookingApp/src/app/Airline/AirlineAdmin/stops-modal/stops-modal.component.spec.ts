import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopsModalComponent } from './stops-modal.component';

describe('StopsModalComponent', () => {
  let component: StopsModalComponent;
  let fixture: ComponentFixture<StopsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
