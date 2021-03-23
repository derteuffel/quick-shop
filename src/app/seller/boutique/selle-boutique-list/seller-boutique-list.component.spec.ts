import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerBoutiqueListComponent } from './seller-boutique-list.component';

describe('BoutiqueComponent', () => {
  let component: SellerBoutiqueListComponent;
  let fixture: ComponentFixture<SellerBoutiqueListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerBoutiqueListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerBoutiqueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
