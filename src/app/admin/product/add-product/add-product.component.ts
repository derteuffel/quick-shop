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
  types: string [];
  categories: string [];
  message: string;
  loading = true;
  productRef;
  public submitted = false;
  public productFormGroup?: FormGroup;
  form: any = {};
  selectedFiles: File[] = [];
  boutique: Boutique;

  public event: EventEmitter<any> = new EventEmitter();
  constructor( private ecommerceService: EcommerceService,
               private route: Router,
               private activatedRoute: ActivatedRoute,
               private bsModalRef: BsModalRef,
               private formBuilder: FormBuilder,
               private boutiqueService: BoutiqueService) {


  }

  ngOnInit(): void {
    this.categories = ['Produit de culture Vegetale', 'Produit elevage'];
    this.types = ['Cuir','Foie gras', 'Fromage fermier','Graisse animale','Laine', 'Lait', 'Oeuf par animal', 'Produit agriculture','Produit elevage equin','Produit origine animale AOP','Rejet elevage', 'Viande',
    'Bois', 'Cereale', 'Derive de cereale', 'Epice ou aromate','Fruit alimentaire', 'Fruits, legumes et cereales AOP', 'Huile essentiel', 'Legumes', 'Plante a fibre', 'Lait', 'Laine', 'Fromage fermier', 'Produit apiculture',
    'Rejet elevage', 'Viande'];
    this.getBoutique();
    this.productFormGroup = this.formBuilder.group({
      name: [''],
      boutiqueId: [''],
      price: [''],
      category: [''],
      type: [''],
      quantity: [''],
      marque: [''],
      description: [''],
      pictures: [null]
    });
  }


  onFilesSelect(event) {
    if (event.target.files.length > 0) {
      for(let i=0; i < event.target.files.length; i++){
        this.selectedFiles.push(<File>event.target.files[i]);
      }
      console.log(this.selectedFiles.toString)
    }
  }


 

  onSubmit(): void{

    const formData = new FormData();
    this.submitted = true;
    if (this.productFormGroup?.invalid) { return; }
    console.log(this.productFormGroup);
    formData.append('name', this.productFormGroup.value.name);
    formData.append('category', this.productFormGroup.value.category);
    formData.append('type', this.productFormGroup.value.type);
    formData.append('price', this.productFormGroup.value.price);
    formData.append('quantity', this.productFormGroup.value.quantity);
    formData.append('description', this.productFormGroup.value.description);
    if(this.selectedFiles.length){
      for(let i=0; i<this.selectedFiles.length; i++){
        formData.append('files[]', this.selectedFiles[i], this.selectedFiles[i].name);
      }
    }
    this.ecommerceService.saveProduct(this.productFormGroup, this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      data => {
        console.log(this.productFormGroup);
        console.log('je suis id : '+this.activatedRoute.snapshot.paramMap.get('id'));
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
