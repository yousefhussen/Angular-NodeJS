import { TestBed } from '@angular/core/testing';

import { PaginateService } from './pagination.service';

describe('PaginationService', () => {
  let service: PaginateService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
