import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Category} from '../../../models/category';
import {Type} from '../../../models/type';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {EcommerceService} from '../../../services/ecommerce.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Quality} from '../../../models/quality';
import { Colors } from '../../../models/colors';
import { Boutique } from '../../../models/boutique';
import { BoutiqueService } from '../../../services/boutique.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


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
  loading = true;
  productRef;
  public submitted = false;
  public productFormGroup?: FormGroup;
  form: any = {};


  constructor( private ecommerceService: EcommerceService,
               private route: Router,
               private activatedRoute: ActivatedRoute,
               private boutiqueService: BoutiqueService) {


  }

  ngOnInit(): void {
    this.categories = Object.keys(Category);
    this.types = Object.keys(Type);
    this.qualities = Object.keys(Quality);
    this.colors = Object.keys(Colors);
    this.initForm();
    this.getBoutique(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  initForm() {
    this.productFormGroup = new FormGroup({
      id: new FormControl(''),
      pictureUrl: new FormControl(''),
      name: new FormControl(''),
      price: new FormControl(''),
      category: new FormControl(''),
      genre: new FormControl(''),
      quality: new FormControl(''),
      marque: new FormControl(''),
      colors: new FormControl(''),
      description: new FormControl(''),
      pictures: new FormControl(''),
      boutique: new FormControl(''),
    });
  }

  onSubmit(): void{

    this.submitted = true;
    if (this.productFormGroup?.invalid) { return; }
    console.log(this.productFormGroup);
    this.ecommerceService.saveProduct(this.productFormGroup, this.boutique.id).subscribe(
      data => {
        console.log(this.productFormGroup);
        console.log(data);
        this.route.navigateByUrl('/admin/detail/boutique/' + this.boutique.id);
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
