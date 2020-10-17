import { TestBed } from '@angular/core/testing';

import { ShipmentServiceService } from './shipment-service.service';

describe('ShipmentServiceService', () => {
  let service: ShipmentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipmentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
