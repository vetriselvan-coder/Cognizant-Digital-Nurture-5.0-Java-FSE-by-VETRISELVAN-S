import { TestBed } from '@angular/core/testing';

import { EnrollmentApiService } from './enrollment-api.service';

describe('EnrollmentApiService', () => {
  let service: EnrollmentApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnrollmentApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
