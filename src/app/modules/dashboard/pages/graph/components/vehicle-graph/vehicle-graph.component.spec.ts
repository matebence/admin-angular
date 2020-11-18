import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VehicleGraphComponent} from './vehicle-graph.component';

describe('VehicleGraphComponent', () => {
  let component: VehicleGraphComponent;
  let fixture: ComponentFixture<VehicleGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleGraphComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
