import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachingCheckoutComponent } from './coaching-checkout.component';

describe('CoachingCheckoutComponent', () => {
  let component: CoachingCheckoutComponent;
  let fixture: ComponentFixture<CoachingCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachingCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachingCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
