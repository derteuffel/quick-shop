import {Component,  EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../../models/category';
import {Type} from '../../../models/type';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {EcommerceService} from '../../../services/ecommerce.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Boutique } from '../../../models/boutique';
import { BoutiqueService } from '../../../services/boutique.service';
import {Product} from "../../../models/product.model";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [MessageService],
})
export class AddProductComponent implements OnInit {

  @Input() product: Product;
  @Output() saveProductEvent = new EventEmitter<Product>();
  @Output() closeDialogEvent = new EventEmitter();

  display: boolean;
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

  constructor( private ecommerceService: EcommerceService,
               private route: Router,
               private activatedRoute: ActivatedRoute,
               private messageService: MessageService,
               private boutiqueService: BoutiqueService) {


  }

  ngOnInit(): void {

    this.display = true;
    this.categories = Object.keys(Category);
    this.types = Object.keys(Type);
    //this.initForm();
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

   // this.submitted = true;
    //if (this.productFormGroup?.invalid) { return; }
    //console.log(this.productFormGroup);
    this.ecommerceService.saveProduct(this.product, this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      data => {
        if (data.success) {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'article submitted', sticky: true});
          this.display = false;
          this.product.id = data.id;
          this.saveProductEvent.emit(this.product);
        }
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
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




  closeFormDialog() {
    this.display = false;
    this.closeDialogEvent.emit();
  }

  /** toast message function primeng  **/
  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }


}
