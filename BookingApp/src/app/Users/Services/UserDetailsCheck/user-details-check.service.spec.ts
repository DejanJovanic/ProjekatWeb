import { TestBed } from '@angular/core/testing';

import { UserDetailsCheckService } from './user-details-check.service';

describe('UserDetailsCheckService', () => {
  let service: UserDetailsCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDetailsCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
