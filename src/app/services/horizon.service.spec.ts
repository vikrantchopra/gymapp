import { TestBed, inject } from '@angular/core/testing';

import { HorizonService } from './horizon.service';

describe('HorizonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HorizonService]
    });
  });

  it('should be created', inject([HorizonService], (service: HorizonService) => {
    expect(service).toBeTruthy();
  }));
});
