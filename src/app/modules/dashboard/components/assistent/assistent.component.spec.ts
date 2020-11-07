import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AssistentComponent} from './assistent.component';

describe('AssistentComponent', () => {
  let component: AssistentComponent;
  let fixture: ComponentFixture<AssistentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssistentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
