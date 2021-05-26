import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EcommerceService} from "../../../services/ecommerce.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UpdateProduit} from "../../../models/update-product.model";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [MessageService],
})
export class ArticleComponent implements OnInit {
  currentProduct: any;
  lists: any = {};
  p = 1;
  searchItem: string;
  message: string;
  loading = true;
  submittedCode: string;
  bsModalRef: BsModalRef;
  updateID;
  update: UpdateProduit;

  addingForm: FormGroup;

  constructor(private productService: EcommerceService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private modalService2: BsModalService,
              private messageService: MessageService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.getProduct(this.activatedRoute.snapshot.paramMap.get('id'));
    this.initForm;
    this.loadList();
  }

  onSubmit(){

  }




  getProduct(id){
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

  /** lister les articles d'une boutique **/
  loadList(): void{

    this.productService.getUpdateByProduct(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (res: any) => {

        this.lists = res;
        console.log(res);
        console.log(this.activatedRoute.snapshot.paramMap.get('id'));
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  openModalProduct(contentAdd: any) {
    this.modalService.open(contentAdd, {size: 'lg'});
  }

  onDelete(contentDelete, event) {
    this.modalService.open(contentDelete, {size: 'lg'});
    this.updateID = event.id;
  }

  deleteUpdate() {
    this.productService.deleteUpdate(this.updateID).subscribe(
      (res: any) => {
        this.loadList();
      }
    );

  }

  initForm() {
    this.addingForm = new FormGroup({
      quantity: new FormControl(''),
      motif: new FormControl(''),
    });
  }


  // mise à jour d'un Produit

  setUpdate(contentUpdate, event) {
    this.modalService.open(contentUpdate, {size: 'lg'});
    this.update = event.name;
    this.updateID = event.id;
    console.log(event.id);
    this.addingForm.patchValue({
      id: event.id,
      motif: event.motif,
      quantity: event.quantity,

    });

  }

  updateUpdate() {
    const updateData = {
      id: this.addingForm.get('id').value,
      name: this.addingForm.get('motif').value,
      quantity: this.addingForm.get('quantity').value,
      type: this.addingForm.get('type').value
    };
    this.productService.updateUpdate(updateData, this.updateID).subscribe(
      (data: any) => {
        console.log(this.updateID);
        this.addingForm.reset();
        this.messageService.add({severity: 'success', summary: 'Record is updated successully', detail: 'record updated'});
        this.loadList();
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
      }
    );
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

  deleteProduct(id){

    this.productService.deleteUpdate(id).subscribe(
      data => {
        console.log('Item deleted');
        this.router.navigateByUrl('/admin/product/detail/' + this.currentProduct.id);
      },
      error => {
        console.log(error);
      }
    );
  }

  closeDialogForm() {
    this.update = null;
  }
}
