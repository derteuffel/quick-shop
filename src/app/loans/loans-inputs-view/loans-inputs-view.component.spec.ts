import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansInputsViewComponent } from './loans-inputs-view.component';

describe('LoansInputsViewComponent', () => {
  let component: LoansInputsViewComponent;
  let fixture: ComponentFixture<LoansInputsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoansInputsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoansInputsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
