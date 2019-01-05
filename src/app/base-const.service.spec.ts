import { TestBed } from '@angular/core/testing';

import { BaseConstService } from './base-const.service';

describe('BaseConstService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseConstService = TestBed.get(BaseConstService);
    expect(service).toBeTruthy();
  });
});
