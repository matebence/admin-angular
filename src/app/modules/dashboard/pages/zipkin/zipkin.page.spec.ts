import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipkinPage } from './zipkin.page';

describe('ZipkinPage', () => {
  let component: ZipkinPage;
  let fixture: ComponentFixture<ZipkinPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZipkinPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipkinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
