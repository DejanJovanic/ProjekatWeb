import { TestBed } from '@angular/core/testing';

import { AirlineAdminNetworkService } from './airline-admin-network.service';

describe('AirlineAdminNetworkService', () => {
  let service: AirlineAdminNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlineAdminNetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
