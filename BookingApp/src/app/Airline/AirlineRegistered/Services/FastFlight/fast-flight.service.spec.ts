import { TestBed } from '@angular/core/testing';

import { FastFlightService } from './fast-flight.service';

describe('FastFlightService', () => {
  let service: FastFlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FastFlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
