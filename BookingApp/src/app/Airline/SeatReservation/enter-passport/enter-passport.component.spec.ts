import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterPassportComponent } from './enter-passport.component';

describe('EnterPassportComponent', () => {
  let component: EnterPassportComponent;
  let fixture: ComponentFixture<EnterPassportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterPassportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterPassportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
