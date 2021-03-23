import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationUpdateProductComponent } from './administration-update-product.component';

describe('AdministrationUpdateProductComponent', () => {
  let component: AdministrationUpdateProductComponent;
  let fixture: ComponentFixture<AdministrationUpdateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationUpdateProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationUpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
