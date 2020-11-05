import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParcelGraphComponent} from './parcel-graph.component';

describe('ParcelGraphComponent', () => {
  let component: ParcelGraphComponent;
  let fixture: ComponentFixture<ParcelGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParcelGraphComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
