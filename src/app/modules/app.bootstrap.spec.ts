import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBootstrap } from './app.bootstrap';

describe('AppBootstrap', () => {
  let component: AppBootstrap;
  let fixture: ComponentFixture<AppBootstrap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppBootstrap ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppBootstrap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
