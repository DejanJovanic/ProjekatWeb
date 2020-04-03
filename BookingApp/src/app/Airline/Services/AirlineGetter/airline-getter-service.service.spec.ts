import { TestBed } from '@angular/core/testing';

import { AirlineGetterServiceService } from './airline-getter-service.service';

describe('AirlineGetterServiceService', () => {
  let service: AirlineGetterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlineGetterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
