import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoansRequestComponent } from './admin-loans-requests.component';

describe('AdminLoansRequestComponent', () => {
  let component: AdminLoansRequestComponent;
  let fixture: ComponentFixture<AdminLoansRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLoansRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoansRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
