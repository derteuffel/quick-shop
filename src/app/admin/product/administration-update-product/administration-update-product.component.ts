import { Component, OnInit } from '@angular/core';
import {EcommerceService} from '../../../services/ecommerce.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Quality} from '../../../models/quality';
import {Category} from '../../../models/category';
import {Type} from '../../../models/type';
import { Product } from 'src/app/models/product.model';
import { Colors } from 'src/app/models/colors';

@Component({
  selector: 'app-administration-update-product',
  templateUrl: './administration-update-product.component.html',
  styleUrls: ['./administration-update-product.component.css']
})
export class AdministrationUpdateProductComponent implements OnInit {

  currentProduct: Product;
  categories: any = {};
  types: any = {};
  qualities: any = {};
  colors: any = {};
  color: any;

  constructor(private productService: EcommerceService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getCurrentProduct(this.activatedRoute.snapshot.paramMap.get('id'));
    this.categories = Object.keys(Category);
    this.types = Object.keys(Type);
    this.qualities = Object.keys(Quality);
    this.colors = Object.keys(Colors);
    this.color = [];
  }

  getCurrentProduct(id){
    this.productService.getProduct(id).subscribe(
      data => {
        this.currentProduct = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(){

    console.log(this.currentProduct);
    this.productService.updateProduct(this.currentProduct, this.currentProduct.id).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl('/admin/product/detail/' + this.currentProduct.id);
      },
      error => {
        console.log(error);
      }
    );
  }

}
