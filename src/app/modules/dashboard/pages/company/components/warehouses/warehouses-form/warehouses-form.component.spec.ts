import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WarehousesFormComponent} from './warehouses-form.component';

describe('WarehousesFormComponent', () => {
  let component: WarehousesFormComponent;
  let fixture: ComponentFixture<WarehousesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarehousesFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehousesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
