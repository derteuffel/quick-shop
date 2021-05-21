import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCoachingComponent } from './details-coaching.component';

describe('DetailsCoachingComponent', () => {
  let component: DetailsCoachingComponent;
  let fixture: ComponentFixture<DetailsCoachingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCoachingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCoachingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
