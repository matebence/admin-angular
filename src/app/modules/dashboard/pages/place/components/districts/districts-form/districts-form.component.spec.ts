import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DistrictsFormComponent} from './districts-form.component';

describe('DistrictsFormComponent', () => {
  let component: DistrictsFormComponent;
  let fixture: ComponentFixture<DistrictsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DistrictsFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
