import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountGraphComponent} from './account-graph.component';

describe('AccountGraphComponent', () => {
  let component: AccountGraphComponent;
  let fixture: ComponentFixture<AccountGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountGraphComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
