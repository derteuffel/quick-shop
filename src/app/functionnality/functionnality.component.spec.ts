import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionnalityComponent } from './functionnality.component';

describe('FunctionnalityComponent', () => {
  let component: FunctionnalityComponent;
  let fixture: ComponentFixture<FunctionnalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionnalityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionnalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
