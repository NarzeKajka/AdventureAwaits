import { TestBed } from '@angular/core/testing';

import { RecenzjaService } from './recenzja.service';

describe('RecenzjaService', () => {
  let service: RecenzjaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecenzjaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
