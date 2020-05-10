import { TestBed } from '@angular/core/testing';

import { RentACarEnterpriseServiceService } from './rent-acar-enterprise-service.service';

describe('RentACarEnterpriseServiceService', () => {
  let service: RentACarEnterpriseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentACarEnterpriseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
