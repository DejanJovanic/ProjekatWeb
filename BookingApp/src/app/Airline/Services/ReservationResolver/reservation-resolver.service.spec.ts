import { TestBed } from '@angular/core/testing';

import { ReservationResolverService } from './reservation-resolver.service';

describe('ReservationResolverService', () => {
  let service: ReservationResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
