import { TestBed } from '@angular/core/testing';

import { SetBookingServiceService } from './set-booking-service.service';

describe('SetBookingServiceService', () => {
  let service: SetBookingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetBookingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
