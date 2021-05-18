import { Component, OnInit } from '@angular/core';
import {Product} from '../../../models/product.model';
import {Boutique} from '../../../models/boutique';
import {EcommerceService} from '../../../services/ecommerce.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BoutiqueService} from '../../../services/boutique.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  p = 1;
  searchItem: string;
  products: Product[];
  boutique: Boutique;

  constructor(private ecommerceService: EcommerceService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private boutiqueService: BoutiqueService) { }

  ngOnInit(): void {

    this.loadData();
  }

  loadData() {
    this.ecommerceService.getAllProductsBoutique(this.boutique.id).subscribe(
      (res: any) => {
        this.products = res.data.body;
      }, error => {
        console.log(error);
      }
    );
  }

}
