import { TestBed } from '@angular/core/testing';

import { FriensResolverService } from './friens-resolver.service';

describe('FriensResolverService', () => {
  let service: FriensResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriensResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
