import { Component, OnInit } from '@angular/core';
import {Category} from '../../../models/category';
import {Type} from '../../../models/type';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EcommerceService} from '../../../services/ecommerce.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Quality} from '../../../models/quality';
import { Colors } from '../../../models/colors';
import { Boutique } from '../../../models/boutique';
import { BoutiqueService } from '../../../services/boutique.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  categories: any = {};
  types: any = {};
  qualities: any = {};
  colors: any = {};
  message: string;
  boutique: Boutique;

  form: any = {};

  constructor( private ecommerceService: EcommerceService, private route: Router, 
    private activatedRoute: ActivatedRoute, private boutiqueService: BoutiqueService) {
  }

  ngOnInit(): void {
    this.categories = Object.keys(Category);
    this.types = Object.keys(Type);
    this.qualities = Object.keys(Quality);
    this.colors = Object.keys(Colors);
    this.getBoutique(this.activatedRoute.snapshot.paramMap.get('id'));
  }



  onSubmit(): void{


    console.log(this.form.color);
    this.ecommerceService.saveProduct(this.form, this.boutique.id).subscribe(
      data => {
        console.log(this.form.color);
        console.log(data);
        this.route.navigateByUrl('/admin/detail/boutique/'+this.boutique.id);
      },
      error => {
        console.log(error);
      }
    );
  }

  getBoutique(id){

    this.boutiqueService.getBoutique(id).subscribe(
      data => {
        this.boutique = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
