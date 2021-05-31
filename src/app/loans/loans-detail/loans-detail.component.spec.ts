import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansDetailComponent } from './loans-detail.component';

describe('LoansDetailComponent', () => {
  let component: LoansDetailComponent;
  let fixture: ComponentFixture<LoansDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoansDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoansDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
