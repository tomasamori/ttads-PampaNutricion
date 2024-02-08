import { TestBed } from '@angular/core/testing';

import { StoreLocatorService } from './store-locator.service';

describe('StoreLocatorService', () => {
  let service: StoreLocatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreLocatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
