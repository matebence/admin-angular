import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EurekaPage} from './eureka.page';

describe('EurekaPage', () => {
  let component: EurekaPage;
  let fixture: ComponentFixture<EurekaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EurekaPage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EurekaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
