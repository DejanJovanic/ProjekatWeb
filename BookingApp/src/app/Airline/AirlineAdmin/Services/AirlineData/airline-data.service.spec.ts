import { TestBed } from '@angular/core/testing';

import { AirlineDataService } from './airline-data.service';

describe('AirlineDataService', () => {
  let service: AirlineDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlineDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
