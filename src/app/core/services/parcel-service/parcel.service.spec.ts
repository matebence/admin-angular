import { TestBed } from '@angular/core/testing';

import { ParcelServiceService } from './parcel-service.service';

describe('ParcelServiceService', () => {
  let service: ParcelServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParcelServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
