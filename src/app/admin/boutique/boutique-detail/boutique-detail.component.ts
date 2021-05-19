import { Component, Input, OnInit, ViewChild} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';

import { Boutique } from '../../../models/boutique';
import { BoutiqueService } from '../../../services/boutique.service';
import { EcommerceService } from '../../../services/ecommerce.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../../models/product.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AddProductComponent} from '../../product/add-product/add-product.component';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Category} from "../../../models/category";
import {Type} from "../../../models/type";



@Component({
  selector: 'app-boutique-detail',
  templateUrl: './boutique-detail.component.html',
  styleUrls: ['./boutique-detail.component.css']
})
export class BoutiqueDetailComponent implements OnInit {
  categories: any = {};
  types: any = {};
  p = 1;
  searchItem: string;
  form: any = {};
  submittedCode: string;
  private bodyText: string;
  currentBoutique: Boutique;
  products: Product[];
  bsModalRef: BsModalRef;
  productID;
  currentProduct: Product;
  visibleSidebar2: any;

  productForm: FormGroup;


  constructor(private ecommerceService: EcommerceService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private modalService: NgbModal,
              private modalService2: BsModalService,
              private router: Router,
              private boutiqueService: BoutiqueService) { }



  ngOnInit(): void {
    this.categories = Object.keys(Category);
    this.types = Object.keys(Type);
    this.getBoutique(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadList();
    this.initForm();

  }


  /** lister les articles d'une boutique **/
  loadList(): void{

    this.ecommerceService.getAllProductsBoutique(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (res: any) => {

        this.products = res;
        console.log(res);
        console.log(this.activatedRoute.snapshot.paramMap.get('id'));
      },
      error1 => {
        console.log(error1);
      }
    );
  }



  getBoutique(id){
    this.boutiqueService.getBoutique(id).subscribe(

      data => {
        this.currentBoutique = data;
        console.log(data);
      }, error1 => {
        console.log(error1);
      }
    );
  }

  onSubmit(){
    this.boutiqueService.activateBoutique(this.currentBoutique.id, this.form.code).subscribe(
      data => {
        console.log(this.form.code);
        console.log('you activated your item successfully');
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  openModalAddProduct(contentAdd: any) {
    this.modalService.open(contentAdd, {size: 'lg'});
  }


  onCreate(p: Product) {
    this.router.navigateByUrl('admin/product/add/' + p.id);
  }

  openModalWithComponent() {

    this.bsModalRef = this.modalService2.show(AddProductComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.event.subscribe(res => {
      this.products.push(res.data);
    });
  }


  showDetailProduct(contentShow, event){
    console.log(event);
    this.modalService.open(contentShow, {size: 'lg'});
    this.ecommerceService.getProduct(event.id).subscribe(
      data => {
        console.log(data);
        this.currentProduct = data;
      }, error1 => {
        console.log(error1);
      }
    );
  }

  onDelete(contentDelete, event) {
    this.modalService.open(contentDelete, {size: 'lg'});
    this.productID = event.id;
  }

  deleteProduct() {
    this.ecommerceService.deleteProduct(this.productID).subscribe(
      (res: any) => {
        this.loadList();
      }
    );

  }

  initForm() {
    this.productForm = new FormGroup({
      id: new FormControl(''),
      quantity: new FormControl(''),
      name: new FormControl(''),
      price: new FormControl(''),
      type: new FormControl(''),
      category: new FormControl(''),
      marque: new FormControl(''),
      description: new FormControl(''),
      pictureUrl: new FormControl(''),
    });
  }


  // mise à jour d'un Produit

  setProduct(contentUpdate, event) {
    this.modalService.open(contentUpdate, {size: 'lg'});
    this.currentProduct = event.name;
    this.productID = event.id;
    console.log(event.id);
    this.productForm.patchValue({
      id: event.id,
      name: event.name,
      quantity: event.quantity,
      type: event.type,
      category: event.category,
      price: event.price,
      description: event.description,
      marque: event.marque,
      pictureUrl: event.pictureUrl


    });

  }

  updateProduct() {
    const ProductData = {
      id: this.productForm.get('id').value,
      name: this.productForm.get('name').value,
      quantity: this.productForm.get('quantity').value,
      type: this.productForm.get('type').value,
      category: this.productForm.get('category').value,
      price: this.productForm.get('price').value,
      description: this.productForm.get('description').value,
      marque: this.productForm.get('marque').value,
      pictureUrl: this.productForm.get('pictureUrl').value,
    };
    this.ecommerceService.updateProduct(ProductData, this.productID).subscribe(
      (data: any) => {
        console.log(this.productID);
        this.productForm.reset();
        //this.messageService.add({severity: 'success', summary: 'Record is updated successully', detail: 'record updated'});
        this.loadList();
      }, error => {
        //this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
      }
    );
  }


}
