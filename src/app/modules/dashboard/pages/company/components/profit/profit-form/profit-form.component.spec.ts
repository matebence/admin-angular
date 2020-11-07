import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfitFormComponent} from './profit-form.component';

describe('ProfitFormComponent', () => {
  let component: ProfitFormComponent;
  let fixture: ComponentFixture<ProfitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfitFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
