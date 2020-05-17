import { TestBed } from '@angular/core/testing';

import { SetFastFlightSeatsService } from './set-fast-flight-seats.service';

describe('SetFastFlightSeatsService', () => {
  let service: SetFastFlightSeatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetFastFlightSeatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
