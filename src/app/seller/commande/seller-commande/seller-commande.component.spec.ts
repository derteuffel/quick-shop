import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCommandeComponent } from './seller-commande.component';

describe('SellerCommandeComponent', () => {
  let component: SellerCommandeComponent;
  let fixture: ComponentFixture<SellerCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerCommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
