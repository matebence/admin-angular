import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PrivilegesFormComponent} from './privileges-form.component';

describe('PrivilegesFormComponent', () => {
  let component: PrivilegesFormComponent;
  let fixture: ComponentFixture<PrivilegesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrivilegesFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivilegesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
