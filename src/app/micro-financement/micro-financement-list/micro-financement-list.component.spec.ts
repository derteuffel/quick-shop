import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroFinancementListComponent } from './micro-financement-list.component';

describe('MicroFinancementListComponent', () => {
  let component: MicroFinancementListComponent;
  let fixture: ComponentFixture<MicroFinancementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroFinancementListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroFinancementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
