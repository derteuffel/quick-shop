import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansInputsDetailsComponent } from './loans-inputs-details.component';

describe('LoansInputsDetailsComponent', () => {
  let component: LoansInputsDetailsComponent;
  let fixture: ComponentFixture<LoansInputsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoansInputsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoansInputsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
