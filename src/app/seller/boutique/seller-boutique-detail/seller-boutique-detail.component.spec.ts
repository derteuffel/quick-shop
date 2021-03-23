import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerBoutiqueDetailComponent } from './seller-boutique-detail.component';

describe('SellerBoutiqueDetailComponent', () => {
  let component: SellerBoutiqueDetailComponent;
  let fixture: ComponentFixture<SellerBoutiqueDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerBoutiqueDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerBoutiqueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
