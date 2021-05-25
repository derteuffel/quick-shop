import { Component, OnInit } from '@angular/core';

import {EcommerceService} from '../../services/ecommerce.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Product} from "../../models/product.model";
import {Category} from "../../models/category";
import {Type} from "../../models/type";
import {BoutiqueService} from "../../services/boutique.service";

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.sass']
})
export class AdministrationComponent implements OnInit {
  categories: any = {};
  types: any = {};
  lists: any;
  p = 1;
  searchItem: string;
  public submitted = false;
  loading = true;
  public productID;
  currentProduct: Product;
  productForm: FormGroup;

  constructor(private modalService: NgbModal,
              private fb: FormBuilder,
              private ecommerceService: EcommerceService,
              private boutiqueService: BoutiqueService) { }

  ngOnInit(): void {
    this.categories = Object.keys(Category);
    this.types = Object.keys(Type);
    this.loadAll();
    this.initForm();
  }

  loadList(): void{
    this.ecommerceService.getAllProductsAdmin().subscribe(
      data => {
        this.lists = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }


  loadAll(){
    this.boutiqueService.getAllBoutiques().subscribe(
      data => {
        console.log(data);
        this.lists = data;
        console.log(this.lists);
      }, error => {
        console.log(error);
      }
    );
  }


  onDelete(contentDelete, event) {
    console.log(event);
    this.modalService.open(contentDelete, {size: 'lg'});
    this.productID = event.id;
    console.log(this.productID);
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

  openModalAddCompany(contentAdd){
    this.modalService.open(contentAdd,{size: 'lg'});
  }

}
