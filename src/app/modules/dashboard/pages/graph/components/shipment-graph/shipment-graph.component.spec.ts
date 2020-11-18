import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShipmentGraphComponent} from './shipment-graph.component';

describe('ShipmentGraphComponent', () => {
  let component: ShipmentGraphComponent;
  let fixture: ComponentFixture<ShipmentGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShipmentGraphComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
