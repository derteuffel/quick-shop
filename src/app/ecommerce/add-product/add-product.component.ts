import { Component, OnInit } from '@angular/core';
import {Category} from '../models/category';
import {Type} from '../models/type';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EcommerceService} from '../services/ecommerce.service';
import {Router} from '@angular/router';
import {Quality} from '../models/quality';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  categories: any = {};
  types: any = {};
  qualities: any = {};
  message: string;

  form: any = {};

  constructor( private ecommerceService: EcommerceService, private route: Router) {
  }

  ngOnInit(): void {
    this.categories = Object.keys(Category);
    this.types = Object.keys(Type);
    this.qualities = Object.keys(Quality);
  }



  onSubmit(): void{


    console.log(this.form);
    this.ecommerceService.saveProduct(this.form).subscribe(
      data => {
        console.log(data);
        this.route.navigateByUrl('/administration');
      },
      error => {
        console.log(error);
      }
    );
  }

}
