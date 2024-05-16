import { TestBed } from '@angular/core/testing';

import { AnalyticDataService } from './analytic-data.service';

describe('AnalyticDataService', () => {
  let service: AnalyticDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalyticDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
