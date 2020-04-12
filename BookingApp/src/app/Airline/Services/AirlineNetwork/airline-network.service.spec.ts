import { TestBed } from '@angular/core/testing';

import { AirlineNetworkService } from './airline-network.service';

describe('AirlineNetworkService', () => {
  let service: AirlineNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlineNetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
