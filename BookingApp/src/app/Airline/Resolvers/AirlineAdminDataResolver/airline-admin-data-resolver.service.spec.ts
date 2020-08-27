import { TestBed } from '@angular/core/testing';

import { AirlineAdminDataResolverService } from './airline-admin-data-resolver.service';

describe('AirlineAdminDataResolverService', () => {
  let service: AirlineAdminDataResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlineAdminDataResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
