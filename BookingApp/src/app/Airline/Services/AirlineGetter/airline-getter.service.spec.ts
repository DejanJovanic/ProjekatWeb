import { TestBed } from '@angular/core/testing';

import { AirlineGetterService } from './airline-getter.service';

describe('AirlineGetterService', () => {
  let service: AirlineGetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlineGetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
