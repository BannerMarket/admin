import { TestBed, inject } from '@angular/core/testing';

import { BannerDataService } from './banner-data.service';

describe('BannerDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BannerDataService]
    });
  });

  it('should be created', inject([BannerDataService], (service: BannerDataService) => {
    expect(service).toBeTruthy();
  }));
});
