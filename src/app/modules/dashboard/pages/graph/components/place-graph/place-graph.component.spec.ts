import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlaceGraphComponent} from './place-graph.component';

describe('PlaceGraphComponent', () => {
  let component: PlaceGraphComponent;
  let fixture: ComponentFixture<PlaceGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaceGraphComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
