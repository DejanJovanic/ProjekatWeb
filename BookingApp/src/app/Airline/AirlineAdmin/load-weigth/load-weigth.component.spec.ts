import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadWeigthComponent } from './load-weigth.component';

describe('LoadWeigthComponent', () => {
  let component: LoadWeigthComponent;
  let fixture: ComponentFixture<LoadWeigthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadWeigthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadWeigthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
