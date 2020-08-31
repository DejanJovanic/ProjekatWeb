import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarStarRatingComponent } from './rent-acar-star-rating.component';

describe('RentACarStarRatingComponent', () => {
  let component: RentACarStarRatingComponent;
  let fixture: ComponentFixture<RentACarStarRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarStarRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarStarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
