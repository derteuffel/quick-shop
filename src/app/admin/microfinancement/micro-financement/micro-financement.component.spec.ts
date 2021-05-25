import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroFinancementComponent } from './micro-financement.component';

describe('MicroFinancementComponent', () => {
  let component: MicroFinancementComponent;
  let fixture: ComponentFixture<MicroFinancementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroFinancementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroFinancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
