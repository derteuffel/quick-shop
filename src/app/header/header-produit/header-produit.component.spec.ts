import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderProduitComponent } from './header-produit.component';

describe('HeaderProduitComponent', () => {
  let component: HeaderProduitComponent;
  let fixture: ComponentFixture<HeaderProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderProduitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
