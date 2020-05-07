import { TestBed } from '@angular/core/testing';

import { SeatResolveService } from './seat-resolve.service';

describe('SeatResolveService', () => {
  let service: SeatResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
