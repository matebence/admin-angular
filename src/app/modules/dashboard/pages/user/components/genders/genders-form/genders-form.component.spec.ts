import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GendersFormComponent} from './genders-form.component';

describe('GendersFormComponent', () => {
  let component: GendersFormComponent;
  let fixture: ComponentFixture<GendersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GendersFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GendersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
