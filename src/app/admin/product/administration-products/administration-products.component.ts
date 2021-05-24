import {Component, Input, OnInit} from '@angular/core';
import {EcommerceService} from '../../../services/ecommerce.service';
import {BoutiqueService} from '../../../services/boutique.service';
import {Product} from '../../../models/product.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Boutique} from '../../../models/boutique';

@Component({
  selector: 'app-administration-products',
  templateUrl: './administration-products.component.html',
  styleUrls: ['./administration-products.component.scss']
})
export class AdministrationProductsComponent implements OnInit {
  p = 1;
  searchItem: string;
  public submitted = false;
  products: Product[];
  boutique: Boutique;

  @Input() product: Product;
  constructor(
    private ecommerService: EcommerceService,
    private boutiqueService: BoutiqueService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  loadProducts() {
    this.ecommerService.getAllProductsBoutique(this.boutique.id).subscribe(
      (res: any) => {
        console.log(res);
        this.products = res.data;
      }, error1 => {
        console.log(error1);
      }
    );
  }

}
