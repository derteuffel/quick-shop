import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansSortantComponent } from './loans-sortant.component';

describe('LoansSortantComponent', () => {
  let component: LoansSortantComponent;
  let fixture: ComponentFixture<LoansSortantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoansSortantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoansSortantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
