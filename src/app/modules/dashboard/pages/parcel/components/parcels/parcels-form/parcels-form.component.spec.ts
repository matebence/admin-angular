import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParcelsFormComponent} from './parcels-form.component';

describe('ParcelsFormComponent', () => {
  let component: ParcelsFormComponent;
  let fixture: ComponentFixture<ParcelsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParcelsFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
