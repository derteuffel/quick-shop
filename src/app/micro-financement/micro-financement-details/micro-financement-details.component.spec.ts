import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroFinancementDetailsComponent } from './micro-financement-details.component';

describe('MicroFinancementDetailsComponent', () => {
  let component: MicroFinancementDetailsComponent;
  let fixture: ComponentFixture<MicroFinancementDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroFinancementDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroFinancementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
