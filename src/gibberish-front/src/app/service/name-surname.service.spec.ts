import { TestBed } from '@angular/core/testing';

import { NameSurnameService } from './name-surname.service';

describe('NameSurnameService', () => {
  let service: NameSurnameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NameSurnameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
