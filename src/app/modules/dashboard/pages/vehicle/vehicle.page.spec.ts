import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VehiclePage} from './vehicles.page';

describe('VehiclePage', () => {
  let component: VehiclePage;
  let fixture: ComponentFixture<VehiclePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehiclePage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
