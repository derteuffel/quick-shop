import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoachingComponent } from './add-coaching.component';

describe('AddCoachingComponent', () => {
  let component: AddCoachingComponent;
  let fixture: ComponentFixture<AddCoachingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCoachingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoachingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
