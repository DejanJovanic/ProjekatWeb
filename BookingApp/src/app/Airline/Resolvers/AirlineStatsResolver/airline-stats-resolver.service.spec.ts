import { TestBed } from '@angular/core/testing';

import { AirlineStatsResolverService } from './airline-stats-resolver.service';

describe('AirlineStatsResolverService', () => {
  let service: AirlineStatsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlineStatsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
