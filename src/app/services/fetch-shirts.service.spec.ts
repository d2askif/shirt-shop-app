import { TestBed, inject } from '@angular/core/testing';

import { FetchShirtsService } from './fetch-shirts.service';

describe('FetchShirtsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchShirtsService]
    });
  });

  it('should be created', inject([FetchShirtsService], (service: FetchShirtsService) => {
    expect(service).toBeTruthy();
  }));
});
