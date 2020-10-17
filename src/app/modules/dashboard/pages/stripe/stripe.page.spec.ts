import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripePage } from './stripe.page';

describe('StripePage', () => {
  let component: StripePage;
  let fixture: ComponentFixture<StripePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StripePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StripePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
