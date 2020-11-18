import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VillagesFormComponent} from './villages-form.component';

describe('VillagesFormComponent', () => {
  let component: VillagesFormComponent;
  let fixture: ComponentFixture<VillagesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VillagesFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VillagesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
