import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAddBoutiqueComponent } from './seller-add-boutique.component';

describe('SellerAddBoutiqueComponent', () => {
  let component: SellerAddBoutiqueComponent;
  let fixture: ComponentFixture<SellerAddBoutiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerAddBoutiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerAddBoutiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
