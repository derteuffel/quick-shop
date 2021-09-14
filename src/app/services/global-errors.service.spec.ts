import { TestBed } from '@angular/core/testing';

import { GlobalErrorsService } from './global-errors.service';

describe('GlobalErrorsService', () => {
  let service: GlobalErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
