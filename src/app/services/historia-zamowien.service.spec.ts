import { TestBed } from '@angular/core/testing';

import { HistoriaZamowienService } from './historia-zamowien.service';

describe('HistoriaZamowienService', () => {
  let service: HistoriaZamowienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoriaZamowienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
