import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PayoutsFormComponent} from './payouts-form.component';

describe('PayoutsFormComponent', () => {
  let component: PayoutsFormComponent;
  let fixture: ComponentFixture<PayoutsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayoutsFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
