import { TestBed } from '@angular/core/testing';

import { AirlineDatabaseService } from './airline-database.service';

describe('AirlineDatabaseService', () => {
  let service: AirlineDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlineDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
