import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerUpdateBoutiqueComponent } from './seller-update-boutique.component';

describe('SellerUpdateBoutiqueComponent', () => {
  let component: SellerUpdateBoutiqueComponent;
  let fixture: ComponentFixture<SellerUpdateBoutiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerUpdateBoutiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerUpdateBoutiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
