import { TestBed } from '@angular/core/testing';

import { BrandsDataService } from './brands-data.service';

describe('BrandsDataService', () => {
  let service: BrandsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
