import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoansInputsComponent } from './admin-loans-inputs.component';

describe('AdminLoansInputsComponent', () => {
  let component: AdminLoansInputsComponent;
  let fixture: ComponentFixture<AdminLoansInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLoansInputsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoansInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
