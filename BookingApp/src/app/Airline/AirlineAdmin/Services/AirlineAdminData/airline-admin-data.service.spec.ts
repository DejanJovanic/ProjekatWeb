import { TestBed } from '@angular/core/testing';

import { AirlineAdminDataService } from './airline-admin-data.service';

describe('AirlineAdminDataService', () => {
  let service: AirlineAdminDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlineAdminDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
