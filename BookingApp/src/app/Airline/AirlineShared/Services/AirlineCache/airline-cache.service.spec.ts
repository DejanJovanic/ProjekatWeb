import { TestBed } from '@angular/core/testing';

import { AirlineCacheService } from './airline-cache.service';

describe('AirlineCacheService', () => {
  let service: AirlineCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlineCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
