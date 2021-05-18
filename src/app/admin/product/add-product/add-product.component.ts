import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {BsModalRef} from "ngx-bootstrap/modal";
import {Product} from "../../../models/product.model";


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  currentProduct: Product;
  categories: any = {};
  types: any = {};
  message: string;
  loading = true;
  productRef;
  public submitted = false;
  public productFormGroup?: FormGroup;
  form: any = {};
  boutique: Boutique;
  public event: EventEmitter<any> = new EventEmitter();
  constructor( private ecommerceService: EcommerceService,
               private route: Router,
               private activatedRoute: ActivatedRoute,
               private bsModalRef: BsModalRef,
               private boutiqueService: BoutiqueService) {


  }

  ngOnInit(): void {
    this.categories = Object.keys(Category);
    this.types = Object.keys(Type);
    this.initForm();
    this.getBoutique();
  }

  initForm() {
    this.productFormGroup = new FormGroup({
      id: new FormControl(''),
      pictureUrl: new FormControl(''),
      name: new FormControl(''),
      price: new FormControl(''),
      category: new FormControl(''),
      type: new FormControl(''),
      quantity: new FormControl(''),
      marque: new FormControl(''),
      description: new FormControl(''),
      pictures: new FormControl(''),
      boutique: new FormControl(''),
    });
  }

  onSubmit(): void{

    this.submitted = true;
    if (this.productFormGroup?.invalid) { return; }
    console.log(this.productFormGroup);
    this.ecommerceService.saveProduct(this.productFormGroup, this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      data => {
        console.log(this.productFormGroup);
        console.log(data);
        this.bsModalRef.hide();
        this.route.navigateByUrl('/admin/detail/boutique/' + this.activatedRoute.snapshot.paramMap.get('id'));
      },
      error => {
        console.log(error);
      }
    );
  }

  getBoutique(){

    this.boutiqueService.getBoutique(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
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
