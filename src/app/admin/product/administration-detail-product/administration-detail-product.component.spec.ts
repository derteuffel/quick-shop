import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationDetailProductComponent } from './administration-detail-product.component';

describe('AdministrationDetailProductComponent', () => {
  let component: AdministrationDetailProductComponent;
  let fixture: ComponentFixture<AdministrationDetailProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationDetailProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationDetailProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
