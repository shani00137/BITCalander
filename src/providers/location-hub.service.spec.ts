import { TestBed } from '@angular/core/testing';

import { LocationHubService } from './location-hub.service';

describe('LocationHubService', () => {
  let service: LocationHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
